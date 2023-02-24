import { Container, Paper, Text, Image, Title } from '@mantine/core';
import { List } from '@mantine/core';
import * as React from 'react';

interface RecipeComponentProps {
    recipeName: string;
    cookTime: string;
    ingredients: string[];
    recipe: string[];
}


const RecipeComponent: React.FunctionComponent<RecipeComponentProps> = ({ recipeName, cookTime, ingredients, recipe }) => {
    return (
        <Paper shadow="xl">
            <Container style={{ display: 'flex' }}>
                <Image
                    radius="md"
                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    alt="Random unsplash image"
                    width={200}
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
                            recipe.map(recipeItem => <List.Item>{recipeItem}</List.Item>) :
                            'Preparation not available'}
                    </List>
                </Text>
            </Container>
        </Paper>
    );
}

export default RecipeComponent;