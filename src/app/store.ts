import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice.js';
import ingredientsSlice from '../features/counter/ingredients/ingredientsSlice';
import recipeDataSlice from '../features/counter/recipe/recipeDataSlice.js';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ingredients: ingredientsSlice,
    recipeData: recipeDataSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;