import { Container, Text, Badge, Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeIngredient } from '../features/counter/ingredients/ingredientsSlice';
import { fetchRecipeData } from '../features/counter/recipe/recipeDataSlice';

interface MainIngredientsProps {

}

const MainIngredients: React.FunctionComponent<MainIngredientsProps> = () => {
    const ingredients = useAppSelector(state => state.ingredients.ingredients);
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.recipeData.recipeDataStatus);

    return (<>
        <Text
            weight={600}
            fz={30}
            ml={20}
            mb={10}
        >
            Ingredients
        </Text>
        <Container>
            {ingredients.map(ingredient => {
                return (
                    <Badge
                        key={ingredient.id}
                        variant="filled"
                        onClick={() => dispatch(removeIngredient(ingredient.id))}
                    >
                        {ingredient.name}
                    </Badge>
                );
            })}
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                onClick={() => dispatch(fetchRecipeData(ingredients.map(ingredient => ingredient.name)))}
            >
                Look for recipe
            </Button>
            <Text>
                {state}
            </Text>
        </Container>
    </>);
}

export default MainIngredients;