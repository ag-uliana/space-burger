import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './reducers/constructorSlice';
import ingredientsReducer from './reducers/ingredientsSlice';
import currentIngredientReducer from './reducers/currentIngredientSlice';
import orderReducer from './reducers/orderSlice';
import authReducer from './reducers/authSlice';
import profileReducer from './reducers/profileSlice';
import feedReducer from './reducers/feedSlice';
import { feedActions } from './reducers/feedSlice';
import profileFeedReducer, {profileFeedActions} from './reducers/profileFeedSlice';
import { socketMiddleware } from './reducers/socketMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    feed: feedReducer,
    profileFeed: profileFeedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(feedActions),
      socketMiddleware(profileFeedActions)
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

(window as any).store = store;

export default store;
