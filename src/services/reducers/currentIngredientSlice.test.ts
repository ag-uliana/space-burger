import currentIngredientReducer, {
    setCurrentIngredient,
    clearCurrentIngredient,
    initialState
} from './currentIngredientSlice';
import { describe, it, expect } from 'vitest';
  
const mockIngredient = {
  _id: 'abc123',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 120,
  price: 250,
  image: 'image-url',
  image_mobile: 'image-mobile',
  image_large: 'image-large',
  uniqueId: 'mock',
  __v: 1879,
};
  
describe('currentIngredientSlice', () => {
  it('возвращает начальное состояние', () => {
    const state = currentIngredientReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
  
  it('устанавливает текущий ингредиент (setCurrentIngredient)', () => {
    const state = currentIngredientReducer(initialState, setCurrentIngredient(mockIngredient));
    expect(state.ingredient).toEqual(mockIngredient);
  });
  
  it('очищает текущий ингредиент (clearCurrentIngredient)', () => {
    const withIngredient = {
      ingredient: mockIngredient,
    };
    const state = currentIngredientReducer(withIngredient, clearCurrentIngredient());
    expect(state.ingredient).toBeNull();
  });
});
  