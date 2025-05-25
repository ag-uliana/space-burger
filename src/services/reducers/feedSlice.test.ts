import feedReducer, {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
  feedInitialState as initialState
} from './feedSlice';
import type { FeedOrder } from './feedSlice';
import { describe, it, expect } from 'vitest';
  
const sampleOrders: FeedOrder[] = [
  {
    _id: 'order1',
    number: 1001,
    name: 'Order 1',
    status: 'done',
    createdAt: '2023-04-01T12:00:00.000Z',
    ingredients: ['ing1', 'ing2'],
  },
  {
    _id: 'order2',
    number: 1002,
    name: 'Order 2',
    status: 'pending',
    createdAt: '2023-04-01T12:05:00.000Z',
    ingredients: ['ing3', 'ing4'],
  },
];
  
describe('feedSlice', () => {
  it('возвращает начальное состояние', () => {
    expect(feedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('обрабатывает wsFeedConnect', () => {
    const result = feedReducer(initialState, wsFeedConnect());
    expect(result.status).toBe('idle');
  });

  it('обрабатывает wsFeedDisconnect', () => {
    const result = feedReducer({ ...initialState, status: 'connected' }, wsFeedDisconnect());
    expect(result.status).toBe('idle');
  });

  it('обрабатывает wsFeedOpen', () => {
    const state = { ...initialState, error: 'some error' };
    const result = feedReducer(state, wsFeedOpen());
    expect(result.status).toBe('connected');
    expect(result.error).toBeNull();
  });

  it('обрабатывает wsFeedClose', () => {
    const result = feedReducer({ ...initialState, status: 'connected' }, wsFeedClose());
    expect(result.status).toBe('idle');
  });

  it('обрабатывает wsFeedError', () => {
    const result = feedReducer(initialState, wsFeedError('connection failed'));
    expect(result.status).toBe('error');
    expect(result.error).toBe('connection failed');
  });

  it('обрабатывает wsFeedMessage', () => {
    const payload = {
      orders: sampleOrders,
      total: 200,
      totalToday: 20,
    };

    const result = feedReducer(initialState, wsFeedMessage(payload));
    expect(result.orders).toEqual(sampleOrders);
    expect(result.total).toBe(200);
    expect(result.totalToday).toBe(20);
  });
});
  