import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types';

type CurrentIngredientState = {
  ingredient: Ingredient | null;
};

export const currentIngredientInitialState : CurrentIngredientState = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: currentIngredientInitialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<Ingredient>) {
      state.ingredient = action.payload;
    },
    clearCurrentIngredient(state) {
      state.ingredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
