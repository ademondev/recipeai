import { Container, Paper, Text, Image, Title } from '@mantine/core';
import { List } from '@mantine/core';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchGoogleImages } from '../features/counter/recipe/recipeDataSlice';

interface RecipeComponentProps {
    recipeName: string;
    cookTime: string;
    ingredients: string[];
    recipe: string[];
}

const RecipeComponent: React.FunctionComponent<RecipeComponentProps> = ({ recipeName, cookTime, ingredients, recipe }) => {
    const src = useAppSelector(state => state.recipeData.currentImage?.url);
    const dispatch = useAppDispatch();
    
    return (
        <Paper shadow="xl">
            <Container style={{ display: 'flex' }}>
                <Image
                    radius="md"
                    src={src}
                    alt="Random unsplash image"
                    width={200}
                    onClick={() => dispatch(fetchGoogleImages(recipeName))}
                />
                <Container>
                    <Title order={3}>
                        Name
                    </Title>
                    <Text>
                        {recipeName ? recipeName : 'Name not available'}
                    </Text>
                    <Title order={3}>
                        Cook time
                    </Title>
                    <Text>
                        {cookTime ? cookTime : 'Time not available'}
                    </Text>
                </Container>
            </Container>
            <Container>
                <Title order={3} mt={5}>
                    Required ingredients
                </Title>
                <Text>
                    {ingredients ? ingredients : 'Ingredients not available'}
                </Text>
            </Container>
            <Container>
                <Title order={3} mt={5}>
                    Preparation
                </Title>
                <Text>
                    <List>
                        {recipe ?
                            recipe.map(recipeItem => <List.Item key={recipeItem}>{recipeItem}</List.Item>) :
                            'Preparation not available'}
                    </List>
                </Text>
            </Container>
        </Paper>
    );
}

export default RecipeComponent;