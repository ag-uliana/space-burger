import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils';
import { resetConstructor } from './constructorSlice';
import { RootState } from '../store';

export type OrderState = {
  orderId: number | null;
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
};
interface OrderResponse {
  success: boolean;
  order: { number: number };
}

export const orderInitialState: OrderState = {
  orderId: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredientIds: string[], { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      let accessToken = state.auth.accessToken;

      if (!accessToken) {
        return rejectWithValue("Вы не авторизованы");
      }

      const data: OrderResponse = await request("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      dispatch(resetConstructor());

      return data.order.number;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка оформления заказа");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
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
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<number>) => {
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
