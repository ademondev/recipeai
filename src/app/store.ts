import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import counterReducer from '../features/counter/counterSlice.js';
import ingredientsSlice from '../features/counter/ingredients/ingredientsSlice';
import recipeDataSlice from '../features/counter/recipe/recipeDataSlice.js';

const persistConfig = {
  key: 'root',
  storage
}

const persistedRecipeDataSlice = persistReducer(persistConfig, recipeDataSlice);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ingredients: ingredientsSlice,
    recipeData: persistedRecipeDataSlice
  }
});
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export { persistor };
export default store;