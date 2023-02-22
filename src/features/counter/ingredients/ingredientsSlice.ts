import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IngredientsInterface {
    id: number
    name: string
}

interface InitialStateInterface {
    ingredients: IngredientsInterface[]
}

const initialState: InitialStateInterface = {
    ingredients: []
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<{ id: number, name: string }>) => {
            if (action.payload.name === '') return;
            state.ingredients.push({
                id: action.payload.id,
                name: action.payload.name
            })
        },
        removeIngredient: (state, action: PayloadAction<number>) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const { addIngredient, removeIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
