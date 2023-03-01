import { Container, Text, Badge, Button, createStyles } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeIngredient } from '../features/ingredients/ingredientsSlice';
import { fetchRecipeData } from '../features/recipe/recipeDataSlice';

const useStyles = createStyles((theme) => ({
    recipeButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1em'
    },
    recipeButton: {
        width: '90%'        
    }, 
    ingredientsContainer: {
        minHeight: "2em"
    },
    recipeBadge: {
        margin: '0.2em',
        maxWidth: '100%',
    }
}));

interface MainIngredientsProps {

}

const MainIngredients: React.FunctionComponent<MainIngredientsProps> = () => {
    const { classes } = useStyles();
    const ingredients = useAppSelector(state => state.ingredients.ingredients);
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.recipeData.recipeDataStatus);

    function lookForRecipe() {
        if (ingredients.length < 0) return;
        dispatch(fetchRecipeData(ingredients.map(ingredient => ingredient.name)));
    }

    return (<>
        <Text
            weight={600}
            fz={30}
            ml={20}
            mb={10}
        >
            Ingredients
        </Text>
        <Container className={classes.ingredientsContainer}>
            {ingredients.map(ingredient => {
                return (
                    <Badge
                        className={classes.recipeBadge}
                        key={ingredient.id}
                        variant="filled"
                        onClick={() => dispatch(removeIngredient(ingredient.id))}
                    >
                        {ingredient.name}
                    </Badge>
                );
            })}
        </Container>
        <Container className={classes.recipeButtonContainer}>
            <Button variant="gradient" gradient={{ from: 'blue', to: 'pink' }}
                onClick={() => lookForRecipe()}
                className={classes.recipeButton}
            >
                Generate recipe
            </Button>
        </Container>
    </>);
}

export default MainIngredients;