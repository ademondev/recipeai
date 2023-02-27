import { Container, Space } from '@mantine/core';
import { useAppSelector } from '../app/hooks';
import MainBottomMenu from '../components/MainBottomMenu';
import SavedRecipeComponent from '../components/SavedRecipeComponent';
import SearchBar from '../components/SearchBar';


const SavedRecipesScreen: React.FunctionComponent = () => {
    const savedRecipes = useAppSelector(state => state.recipeData.savedRecipesStorage);
    const searchBarState = useAppSelector(state => state.searchBar.searchBarState);
    // recipe.recipeName must be lower case as the searchbar wouldn't be able to filter
    // recipes properly due to the recipes having uppercase letters, not matching 
    // unless you write the names perfectly.
    const filteredSavedRecipes = savedRecipes.filter(recipe => recipe.recipeName.toLowerCase().includes(searchBarState));
    return (<>
        <SearchBar />
        <Container>
            {filteredSavedRecipes.map(recipe => {
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