import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FeedOrder = {
  _id: string;
  number: number;
  name: string;
  status: 'done' | 'pending' | 'created';
  createdAt: string;
  ingredients: string[];
};

export type FeedState = {
  orders: FeedOrder[];
  status: 'idle' | 'connected' | 'error';
  error: string | null;
  total: number;
  totalToday: number;
};

export const feedInitialState: FeedState = {
  orders: [],
  status: 'idle',
  error: null,
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: feedInitialState,
  reducers: {
    wsFeedConnect(state) {
      state.status = 'idle';
    },
    wsFeedDisconnect(state) {
      state.status = 'idle';
    },
    wsFeedOpen(state) {
      state.status = 'connected';
      state.error = null;
    },
    wsFeedClose(state) {
      state.status = 'idle';
    },
    wsFeedError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    wsFeedMessage(state, action: PayloadAction<{
      orders: FeedOrder[];
      total: number;
      totalToday: number;
    }>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  }
});

export const {
  wsFeedConnect,
  wsFeedDisconnect,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
} = feedSlice.actions;

export const feedActions = {
  wsConnect: wsFeedConnect.type,
  wsDisconnect: wsFeedDisconnect.type,
  onOpen: wsFeedOpen.type,
  onClose: wsFeedClose.type,
  onError: wsFeedError.type,
  onMessage: wsFeedMessage.type,
};

export default feedSlice.reducer;

