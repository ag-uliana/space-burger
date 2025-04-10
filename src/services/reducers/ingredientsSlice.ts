import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, ApiResponse } from '../../utils';
import { Ingredient } from '../../types';

export type IngredientsState = {
  items: Ingredient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: IngredientsState = {
  items: [],
  status: 'idle',
};

export const fetchIngredients = createAsyncThunk<Ingredient[]>(
  'ingredients/fetchIngredients', 
  async () => {
    const response = await request<ApiResponse<Ingredient[]>>("/ingredients");
    return response.data!;
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectIngredientsStatus = (state: { ingredients: IngredientsState }) => state.ingredients.status;
export const selectIngredients = (state: { ingredients: IngredientsState }) => state.ingredients.items;

export default ingredientsSlice.reducer;
