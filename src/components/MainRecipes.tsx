import * as React from 'react';
import { useEffect } from 'react';
import { Text } from '@mantine/core';
import RecipeComponent from './RecipeComponent';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchGoogleImages } from '../features/recipe/recipeDataSlice';

interface MainRecipeProps {

}

const MainRecipe: React.FunctionComponent<MainRecipeProps> = () => {
    const { recipeName, cookTime, ingredients, recipe, id } = useAppSelector((state) => state.recipeData.recipeData);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (recipeName !== '') {
            dispatch(fetchGoogleImages(recipeName));
        }
    }, [recipeName]);
    return (<>
        <Text
            weight={600}
            fz={30}
            ml={20}
            mt={20}
            mb={10}
        >
            Recipes
        </Text>
        <RecipeComponent
            recipeName={recipeName}
            cookTime={cookTime}
            ingredients={ingredients}
            recipe={recipe}
            id={id}
        />
    </>);
}

export default MainRecipe;
