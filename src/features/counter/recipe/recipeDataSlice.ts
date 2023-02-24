import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    recipeData: {
        recipeName: '',
        cookTime: '',
        ingredients: [],
        recipe: []
    },
    requestStatus: 'pending'
};

const ENDPOINT = 'http://localhost:5000/completion';

const fetchRecipeData = createAsyncThunk('recipeData/fetchRecipeData', async (ingredientsArray: string[]) => {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: ingredientsArray })
  });
  const data = response.json();
  console.log(JSON.stringify({ message: ingredientsArray }))
  return data;
});

const recipeDataSlice = createSlice({
  name: 'recipeData',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchRecipeData.pending.toString()]: (state) => {
      state.requestStatus = 'pending';
    },
    [fetchRecipeData.fulfilled.toString()]: (state, action) => {
      state.requestStatus = 'fulfilled'
      // action.payload.data will return null if chatgpt doesn't find an acording recipe
      if (action.payload.data === null) return; 
      state.recipeData = action.payload.data;
      console.log('payload', action.payload);
    },
    [fetchRecipeData.rejected.toString()]: (state) => {
      state.requestStatus = 'rejected';
    }
  }
});

export { fetchRecipeData };
export default recipeDataSlice.reducer;