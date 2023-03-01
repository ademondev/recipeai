import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Image } from 'google-images';

export interface RecipeInterface {
    recipeName: string,
    cookTime: string,
    ingredients: string[],
    recipe: string[],
    id: string;
}

export interface SavedRecipesInterface extends RecipeInterface {
    image: Image
}

type SavedRecipeId = string;

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
        recipe: [],
        id: ''
    } as RecipeInterface,
    recipeDataStatus: RecipeDataStatuses.PENDING,
    // The default image for recipes is DEFAULT_IMAGE_URL.
    // It will then be replaced by an array of ten images
    // (represented by ten objects). This array should never
    // be empty, instead, it should make another call to
    // fetchGoogleImages before running out of images.
    googleImagesData: [
        {
            url: DEFAULT_IMAGE_URL,
            type: '',
            height: 292,
            width: 390,
            size: 100,
            thumbnail: {
                height: 10,
                width: 8,
                url: ''
            }
        }
    ],
    googleImagesStatus: GoogleImagesStatuses.PENDING,
    savedRecipesStorage: [
        {
            recipeName: 'tomato',
            cookTime: '10',
            id: '12412sfaw',
            ingredients: ['tomato'],
            recipe: ['asfasfsafs'],
            image: {
                url: DEFAULT_IMAGE_URL
            }
        }
    ] as SavedRecipesInterface[]
};

const ENDPOINT_RECIPE_DATA = `${import.meta.env.VITE_API_ENDPOINT}/completion`;
const ENDPOINT_GOOGLE_IMAGES = `${import.meta.env.VITE_API_ENDPOINT}/images`;

const fetchRecipeData = createAsyncThunk('recipeData/fetchRecipeData', async (ingredientsArray : string[]) => {
    const response = await fetch(ENDPOINT_RECIPE_DATA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {message: ingredientsArray}
        )
    });
    const recipe = await response.json()as RecipeInterface;
    console.log(JSON.stringify({message: ingredientsArray}));
    return recipe;
});

const fetchGoogleImages = createAsyncThunk('recipeData/fetchGoogleImages', async (searchTerm : string) => {
    if (searchTerm === '') return;
    const response = await fetch(ENDPOINT_GOOGLE_IMAGES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({searchTerm})
    });
    const imageArray = await response.json()as Image[];
    return imageArray;
})


const recipeDataSlice = createSlice({
    name: 'recipeData',
    initialState,
    reducers: {
        nextImage: (state) => {
            if (state.googleImagesData.length < 1) return;
            state.googleImagesData.shift();
        },
        addToSavedRecipesStorage: (state, action : PayloadAction<SavedRecipesInterface>) => {
            if (state.savedRecipesStorage.find(item => item.id === action.payload.id) !== undefined) return;
            state.savedRecipesStorage.unshift(action.payload);
        },
        removeFromSavedRecipesStorage: (state, action: PayloadAction<SavedRecipeId>) => {
            state.savedRecipesStorage = state.savedRecipesStorage.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: {
        // fetchRecipeData
        [fetchRecipeData.pending.toString()]: (state) => {
            state.recipeDataStatus = RecipeDataStatuses.PENDING;
        },
        [fetchRecipeData.fulfilled.toString()]: (state, action) => {
            state.recipeDataStatus = RecipeDataStatuses.FULFILLED;
            const {data} : {
                data: RecipeInterface
            } = action.payload;
            // action.payload.data will return null if chatgpt doesn't find an acording recipe
            if (data === null) 
                return;
            

            state.recipeData = data;
            console.log('payload', data);
        },
        [fetchRecipeData.rejected.toString()]: (state) => {
            state.recipeDataStatus = RecipeDataStatuses.REJECTED;
        },
        // //////////////////////
        // fetchGoogleImages
        [fetchGoogleImages.pending.toString()]: (state) => {
            state.googleImagesStatus = GoogleImagesStatuses.PENDING;
        },
        [fetchGoogleImages.fulfilled.toString()]: (state, action) => {
            state.googleImagesStatus = GoogleImagesStatuses.FULFILLED;
            if (action.payload.data === null || action.payload.data === undefined) return;
            state.googleImagesData = action.payload.data as Image[];
        },
        [fetchGoogleImages.rejected.toString()]: (state) => {
            state.googleImagesStatus = GoogleImagesStatuses.REJECTED;
        }
    }
});

export {
    fetchRecipeData,
    fetchGoogleImages
};
export const { nextImage, addToSavedRecipesStorage, removeFromSavedRecipesStorage } = recipeDataSlice.actions;
export default recipeDataSlice.reducer;
