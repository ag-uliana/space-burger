import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Ingredient } from '../../types';

type ConstructorState = {
  bun: Ingredient | null;
  fillings: Ingredient[];
};

const initialState: ConstructorState = {
  bun: null,
  fillings: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<Ingredient>) {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
        } else {
          state.fillings.push(action.payload);
        }
      },
      
      prepare(ingredient: Ingredient) {
        return {
          payload: {
            ...ingredient,
            uniqueId: nanoid(),
          },
        };
      },
    },

    removeIngredient(state, action: PayloadAction<string>) {
      state.fillings = state.fillings.filter((item) => item.uniqueId !== action.payload);
    },

    moveIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const movedItem = state.fillings[fromIndex];

      state.fillings.splice(fromIndex, 1);
      state.fillings.splice(toIndex, 0, movedItem);
    },

    resetConstructor(state) {
      state.bun = null;
      state.fillings = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, resetConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;

