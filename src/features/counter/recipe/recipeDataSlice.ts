import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Image } from 'google-images';
import { useAppDispatch } from '../../../app/hooks';

interface RecipeInterface {
  recipeName: string,
  cookTime: string,
  ingredients: string[],
  recipe: string[]
}

enum RecipeDataStatuses {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

enum GoogleImagesStatuses {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80";

const initialState = {
    recipeData: {
        recipeName: '',
        cookTime: '',
        ingredients: [],
        recipe: []
    } as RecipeInterface,
    recipeDataStatus: RecipeDataStatuses.PENDING,
    googleImagesData: [] as Image[],
    currentImage: {
      url: DEFAULT_IMAGE_URL
    } as Image,
    googleImagesStatus: GoogleImagesStatuses.PENDING,
};

const ENDPOINT_RECIPE_DATA = 'http://localhost:5000/completion';
const ENDPOINT_GOOGLE_IMAGES = 'http://localhost:5000/images';

const fetchRecipeData = createAsyncThunk('recipeData/fetchRecipeData', async (ingredientsArray: string[]) => {
  const response = await fetch(ENDPOINT_RECIPE_DATA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: ingredientsArray })
  });
  const recipe = await response.json() as RecipeInterface;
  console.log(JSON.stringify({ message: ingredientsArray }));
  return recipe;
});

const fetchGoogleImages = createAsyncThunk('recipeData/fetchGoogleImages', async (searchTerm: string) => {
  const response = await fetch(ENDPOINT_GOOGLE_IMAGES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ searchTerm })
  });
  const imageArray = await response.json() as Image[];
  return imageArray;
})


const recipeDataSlice = createSlice({
  name: 'recipeData',
  initialState,
  reducers: {
  },
  extraReducers: {
    // fetchRecipeData
    [fetchRecipeData.pending.toString()]: (state) => {
      state.recipeDataStatus = RecipeDataStatuses.PENDING;
    },
    [fetchRecipeData.fulfilled.toString()]: (state, action) => {
      state.recipeDataStatus = RecipeDataStatuses.FULFILLED;
      const { data }: { data: RecipeInterface } = action.payload;
      // action.payload.data will return null if chatgpt doesn't find an acording recipe
      if (data === null) return; 
      state.recipeData = data;
      console.log('payload', data);
    },
    [fetchRecipeData.rejected.toString()]: (state) => {
      state.recipeDataStatus = RecipeDataStatuses.REJECTED;
    },
    ////////////////////////
    // fetchGoogleImages
    [fetchGoogleImages.pending.toString()]: (state) => {
      state.googleImagesStatus = GoogleImagesStatuses.PENDING;
    },
    [fetchGoogleImages.fulfilled.toString()]: (state, action) => {
      state.googleImagesStatus = GoogleImagesStatuses.FULFILLED;
      if (action.payload === null || action.payload === undefined) return;
      state.googleImagesData = action.payload.data as Image[];
      state.currentImage = action.payload.data[0];
    },
    [fetchGoogleImages.rejected.toString()]: (state) => {
      state.googleImagesStatus = GoogleImagesStatuses.REJECTED;
    }
  }
});

export { fetchRecipeData, fetchGoogleImages };
export default recipeDataSlice.reducer;