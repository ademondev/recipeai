import { Container, Text, Badge } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeIngredient } from '../features/counter/ingredients/ingredientsSlice';

interface MainIngredientsProps {
    
}
 
const MainIngredients: React.FunctionComponent<MainIngredientsProps> = () => {
    const ingredients = useAppSelector(state => state.ingredients.ingredients);
    const dispatch = useAppDispatch();

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
                        variant="filled"
                        onClick={() => dispatch(removeIngredient(ingredient.id))}
                    >
                        {ingredient.name}
                    </Badge>
                );
            })}        
        </Container>
    </>);
}
 
export default MainIngredients;