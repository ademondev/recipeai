import * as React from 'react';
import { createStyles, Center, Container, Header, Autocomplete } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeSearchBarState } from '../features/searchbar/searchBarSlice';
import { AiOutlineSearch } from 'react-icons/ai';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
        width: '100%'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        height: '100%',
        width: '100%'
    },
    autocomplete: {
        width: '80%'
    }
}));

const SearchBar: React.FunctionComponent = () => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const savedRecipesStorage = useAppSelector(state => state.recipeData.savedRecipesStorage);
    const recipeNames = savedRecipesStorage.map(recipe => recipe.recipeName);

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Center className={classes.header}>
                <Autocomplete
                    className={classes.autocomplete}
                    placeholder="Search by recipe name"
                    icon={<AiOutlineSearch />}
                    data={recipeNames}
                    onChange={(str) => dispatch(changeSearchBarState(str))}
                />
            </Center>
        </Header>
    );
}

export default SearchBar;