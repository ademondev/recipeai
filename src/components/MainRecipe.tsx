import * as React from 'react';
import { Text } from '@mantine/core';
import RecipeComponent from './RecipeComponent';

interface MainRecipesProps {

}

const MainRecipes: React.FunctionComponent<MainRecipesProps> = () => {
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
        <RecipeComponent name={''} cookTime={0} requiredIngredients={''} preparation={''} />
    </>);
}

export default MainRecipes;
