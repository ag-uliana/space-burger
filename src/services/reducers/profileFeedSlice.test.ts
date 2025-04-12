import profileFeedReducer, {
  wsProfileConnect,
  wsProfileOpen,
  wsProfileClose,
  wsProfileError,
  wsProfileMessage,
  wsProfileDisconnect,
  initialState
} from './profileFeedSlice';
import type { FeedOrder } from './feedSlice';
import { describe, it, expect } from 'vitest';

const sampleOrders: FeedOrder[] = [
  {
    _id: '1',
    number: 1001,
    name: 'Order One',
    status: 'done',
    createdAt: '2025-04-05T10:00:00.000Z',
    ingredients: ['i1', 'i2'],
  },
  {
    _id: '2',
    number: 1002,
    name: 'Order Two',
    status: 'pending',
    createdAt: '2025-04-05T10:05:00.000Z',
    ingredients: ['i3', 'i4'],
  },
];

describe('profileFeedSlice reducer', () => {
  it('возвращает начальное состояние', () => {
    expect(profileFeedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('обрабатывает wsProfileConnect', () => {
    const result = profileFeedReducer(initialState, wsProfileConnect());
    expect(result.status).toBe('idle');
  });

  it('обрабатывает wsProfileOpen', () => {
    const errorState = { ...initialState, error: 'some error' };
    const result = profileFeedReducer(errorState, wsProfileOpen());
    expect(result.status).toBe('connected');
    expect(result.error).toBeNull();
  });

  it('обрабатывает wsProfileClose', () => {
    const connectedState = { ...initialState, status: 'connected' } as const;
    const result = profileFeedReducer(connectedState, wsProfileClose());
    expect(result.status).toBe('idle');
  });

  it('обрабатывает wsProfileError', () => {
    const result = profileFeedReducer(initialState, wsProfileError('Connection failed'));
    expect(result.status).toBe('error');
    expect(result.error).toBe('Connection failed');
  });

  it('обрабатывает wsProfileMessage', () => {
    const payload = {
      orders: sampleOrders,
      total: 999,
      totalToday: 99,
    };
    const result = profileFeedReducer(initialState, wsProfileMessage(payload));
    expect(result.orders).toEqual(sampleOrders);
    expect(result.total).toBe(999);
    expect(result.totalToday).toBe(99);
  });

  it('обрабатывает wsProfileDisconnect', () => {
    const stateBefore = {
      ...initialState,
      status: 'connected',
      orders: sampleOrders,
    } as const;
    const result = profileFeedReducer(stateBefore, wsProfileDisconnect());
    expect(result.status).toBe('idle');
    expect(result.orders).toEqual([]);
  });
});
