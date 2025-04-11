import ingredientsReducer, { fetchIngredients, initialState } from './ingredientsSlice';
import type { Ingredient } from '../../types';
import { describe, it, expect } from 'vitest';

const mockIngredients: Ingredient[] = [
  {
        _id: 'abc123',
    name: 'Test Ingredient1',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 15,
    calories: 120,
    price: 250,
    image: 'image1',
    image_mobile: 'image-mobile1',
    image_large: 'image-large1',
    uniqueId: 'mock1',
    __v: 1879,
  },
  {
        _id: 'abc124',
    name: 'Test Ingredient2',
    type: 'main',
    proteins: 5,
    fat: 14,
    carbohydrates: 55,
    calories: 420,
    price: 2780,
    image: 'image2',
    image_mobile: 'image-mobile2',
    image_large: 'image-large2',
    uniqueId: 'mock2',
    __v: 1889,
  },
];

describe('ingredientsSlice reducer', () => {
  it('возвращает начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('обрабатывает fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('обрабатывает fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockIngredients);
  });

  it('обрабатывает fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.status).toBe('failed');
  });
});
