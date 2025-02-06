import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_API_UPL } from '../../constants';

type OrderState = {
  orderId: string | null;
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: OrderState = {
  orderId: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await fetch(ORDER_API_UPL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ошибка оформления заказа");
      }

      return data.order.number;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder(state) {
      state.orderId = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.orderId = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
