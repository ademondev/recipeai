import { Container, Paper, Text, Image, Title } from '@mantine/core';
import * as React from 'react';

interface RecipeComponentProps {
    name: string
    cookTime: number
    requiredIngredients: string
    preparation: string
}

const RecipeComponent: React.FunctionComponent<RecipeComponentProps> = ({ name, cookTime, requiredIngredients, preparation }) => {
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
                        { name ? name : 'Name not available'}
                    </Text>
                    <Title order={3}>
                        Cook time
                    </Title>
                    <Text>
                        { cookTime ? cookTime : 'Time not available'}
                    </Text>
                </Container>
            </Container>
            <Container>
                <Title order={3} mt={5}>
                    Required ingredients
                </Title>
                <Text>
                    { requiredIngredients ? requiredIngredients : 'Ingredients not available'}
                </Text>
            </Container>
            <Container>
                <Title order={3} mt={5}>
                    Preparation
                </Title>
                <Text>
                    { preparation ? preparation : 'Preparation not available' }
                </Text>
            </Container>
        </Paper>
    );
}

export default RecipeComponent;