import { vi, describe, it, expect } from 'vitest';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  initialState
} from './constructorSlice';

vi.mock('nanoid', () => ({
  nanoid: () => 'unique-id',
}));

const sampleBun = {
  _id: 'bun123',
  name: 'Bun',
  type: 'bun',
  uniqueId: 'bun-uid',
  proteins: 123,
  fat: 12,
  carbohydrates: 45,
  calories: 457,
  price: 1129,
  image: 'image',
  image_mobile: 'image_mobile',
  image_large: 'image_large',
  __v: 1279,
};

const sampleFilling1 = {
  _id: 'filling1',
  name: 'Cheese',
  type: 'filling',
  uniqueId: 'fill-1',
  proteins: 143,
  fat: 6,
  carbohydrates: 52,
  calories: 350,
  price: 1904,
  image: 'image',
  image_mobile: 'image_mobile1',
  image_large: 'image_large1',
  __v: 1879,
};

const sampleFilling2 = {
  _id: 'filling2',
  name: 'Lettuce',
  type: 'filling',
  uniqueId: 'fill-2',
  proteins: 1,
  fat: 13,
  carbohydrates: 64,
  calories: 560,
  price: 194,
  image: 'image', 
  image_mobile: 'image_mobile2',
  image_large: 'image_large2',
  __v: 1879,
};

describe('constructorReducer', () => {
  it('возвращает начальное состояние', () => {
    expect(constructorReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('добавляет булку', () => {
    const result = constructorReducer(initialState, addIngredient({ ...sampleBun }));
    expect(result.bun).toEqual({ ...sampleBun, uniqueId: 'unique-id' });
    expect(result.fillings).toEqual([]);
  });

  it('добавляет начинку', () => {
    const result = constructorReducer(initialState, addIngredient({ ...sampleFilling1 }));
    expect(result.fillings.length).toBe(1);
    expect(result.fillings[0]).toEqual({ ...sampleFilling1, uniqueId: 'unique-id' });
  });

  it('удаляет начинку по uniqueId', () => {
    const startState = {
      bun: null,
      fillings: [sampleFilling1, sampleFilling2],
    };

    const result = constructorReducer(startState, removeIngredient('fill-1'));
    expect(result.fillings).toEqual([sampleFilling2]);
  });

  it('перемещает начинку (drag & drop)', () => {
    const startState = {
      bun: null,
      fillings: [sampleFilling1, sampleFilling2],
    };

    const result = constructorReducer(
      startState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(result.fillings).toEqual([sampleFilling2, sampleFilling1]);
  });

  it('сбрасывает состояние конструктора', () => {
    const startState = {
      bun: sampleBun,
      fillings: [sampleFilling1, sampleFilling2],
    };

    const result = constructorReducer(startState, resetConstructor());

    expect(result).toEqual(initialState);
  });
});
