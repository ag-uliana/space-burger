import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import currentIngredientReducer from './currentIngredientSlice';
import orderReducer from './orderSlice';
import feedReducer from './feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  feed: feedReducer,
});

export default rootReducer;
