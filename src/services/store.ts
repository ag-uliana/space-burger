import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './reducers/constructorSlice';
import ingredientsReducer from './reducers/ingredientsSlice';
import currentIngredientReducer from './reducers/currentIngredientSlice';
import orderReducer from './reducers/orderSlice';
import authReducer from './reducers/authSlice';
import profileReducer from './reducers/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    burgerConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
