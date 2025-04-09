import orderReducer, {
  createOrder,
  resetOrder,
} from './orderSlice';
import type { OrderState } from './orderSlice';
import { describe, it, expect } from 'vitest';

const initialState: OrderState = {
  orderId: null,
  status: 'idle',
  error: null,
};

describe('orderSlice', () => {
  it('возвращает начальное состояние', () => {
    const result = orderReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('обрабатывает resetOrder', () => {
    const state: OrderState = {
      orderId: 1234,
      status: 'failed',
      error: 'что-то пошло не так',
    };

    const result = orderReducer(state, resetOrder());

    expect(result).toEqual(initialState);
  });

  it('обрабатывает createOrder.pending', () => {
    const result = orderReducer(initialState, { type: createOrder.pending.type });
    expect(result.status).toBe('loading');
    expect(result.error).toBeNull();
  });

  it('обрабатывает createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: 9876,
    };
    const result = orderReducer(initialState, action);
    expect(result.status).toBe('idle');
    expect(result.orderId).toBe(9876);
  });

  it('обрабатывает createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка оформления заказа',
    };
    const result = orderReducer(initialState, action);
    expect(result.status).toBe('failed');
    expect(result.error).toBe('Ошибка оформления заказа');
  });
});
