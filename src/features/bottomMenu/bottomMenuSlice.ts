import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    buttonMenuIndex: 0
}

type ButtonMenuIndex = number;

const bottomMenuSlice = createSlice({
    name: 'menuIndex',
    initialState,
    reducers: {
        changeButtonMenuState: (state, action: PayloadAction<ButtonMenuIndex>) => {
            state.buttonMenuIndex = action.payload;
        }
    }
});

export const { changeButtonMenuState } = bottomMenuSlice.actions;
export default bottomMenuSlice.reducer;