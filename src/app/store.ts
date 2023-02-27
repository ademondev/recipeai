import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import ingredientsSlice from '../features/ingredients/ingredientsSlice';
import recipeDataSlice from '../features/recipe/recipeDataSlice.js';
import searchBarSlice from '../features/searchbar/searchBarSlice';

const persistConfig = {
  key: 'root',
  storage
}

const persistedRecipeDataSlice = persistReducer(persistConfig, recipeDataSlice);

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    recipeData: persistedRecipeDataSlice,
    searchBar: searchBarSlice
  }
});
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export { persistor };
export default store;