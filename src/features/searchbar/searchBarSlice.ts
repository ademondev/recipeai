import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    searchBarState: ''
}

type SearchBarState = string;

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState,
    reducers: {
        changeSearchBarState: (state, action: PayloadAction<SearchBarState>) => {
            state.searchBarState = action.payload.toLocaleLowerCase();
        }
    }
});

export const { changeSearchBarState } = searchBarSlice.actions;
export default searchBarSlice.reducer;