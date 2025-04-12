import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedOrder } from './feedSlice';

export type ProfileFeedState = {
  orders: FeedOrder[];
  status: 'idle' | 'connected' | 'error';
  error: string | null;
  total: number;
  totalToday: number;
};

export const initialState: ProfileFeedState = {
  orders: [],
  status: 'idle',
  error: null,
  total: 0,
  totalToday: 0,
};

const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {
    wsProfileConnect(state) {
      state.status = 'idle';
    },
    wsProfileOpen(state) {
      state.status = 'connected';
      state.error = null;
    },
    wsProfileClose(state) {
      state.status = 'idle';
    },
    wsProfileError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    wsProfileMessage(state, action: PayloadAction<{
      orders: FeedOrder[];
      total: number;
      totalToday: number;
    }>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsProfileDisconnect(state) {
      state.status = 'idle';
      state.orders = [];
    }
  }
});

export const {
  wsProfileConnect,
  wsProfileOpen,
  wsProfileClose,
  wsProfileError,
  wsProfileMessage,
  wsProfileDisconnect
} = profileFeedSlice.actions;

export const profileFeedActions = {
  wsConnect: wsProfileConnect.type,
  wsDisconnect: wsProfileDisconnect.type,
  onOpen: wsProfileOpen.type,
  onClose: wsProfileClose.type,
  onError: wsProfileError.type,
  onMessage: wsProfileMessage.type,
};

export default profileFeedSlice.reducer;
