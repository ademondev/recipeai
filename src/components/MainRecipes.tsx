import * as React from 'react';
import { Text } from '@mantine/core';
import RecipeComponent from './RecipeComponent';
import { useAppDispatch, useAppSelector } from '../app/hooks';

interface MainRecipeProps {

}

const MainRecipe: React.FunctionComponent<MainRecipeProps> = () => {
    const { recipeName, cookTime, ingredients, recipe } = useAppSelector(state => state.recipeData.recipeData);
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
        />
    </>);
}

export default MainRecipe;
