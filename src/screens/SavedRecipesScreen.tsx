import { Container, createStyles, Space } from '@mantine/core';
import { useAppSelector } from '../app/hooks';
import MainBottomMenu from '../components/MainBottomMenu';
import SavedRecipeComponent from '../components/SavedRecipeComponent';


const SavedRecipesScreen: React.FunctionComponent = () => {
    const savedRecipes = useAppSelector(state => state.recipeData.savedRecipesStorage);
    return (<>
        <Container>
            {savedRecipes.map(recipe => {
                return (
                    <SavedRecipeComponent
                        recipeName={recipe.recipeName}
                        cookTime={recipe.cookTime}
                        ingredients={recipe.ingredients}
                        recipe={recipe.recipe}
                        src={recipe.image?.url}
                        id={recipe.id}
                        key={recipe.id}
                    />
                );
            })}
        </Container>
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <MainBottomMenu />
    </>);
}

export default SavedRecipesScreen;