import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice.js';
import ingredientsSlice from '../features/counter/ingredients/ingredientsSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ingredients: ingredientsSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;