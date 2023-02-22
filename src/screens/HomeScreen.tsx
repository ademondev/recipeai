import MainBottomMenu from '../components/MainBottomMenu';
import { MainHeader } from '../components/MainHeader';
import MainIngredients from '../components/MainIngredients';
import MainRecipe from '../components/MainRecipe';

function HomeScreen() {
    return (<>
        <MainHeader />
        <MainIngredients />
        <MainRecipe />
        <MainRecipe />
        <MainRecipe />
        <MainBottomMenu />
    </>);
}

export default HomeScreen;