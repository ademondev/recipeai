import { Container, Paper, Text, Image, Title, Button, Space } from '@mantine/core';
import { List } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchGoogleImages, nextImage } from '../features/counter/recipe/recipeDataSlice';

const useStyles = createStyles((theme) => ({
    buttons: {
        width: '100%',
        height: '3em',
        margin: '0.1em'
    }
}));

interface RecipeComponentProps {
    recipeName: string;
    cookTime: string;
    ingredients: string[];
    recipe: string[];
}

const RecipeComponent: React.FunctionComponent<RecipeComponentProps> = ({ recipeName, cookTime, ingredients, recipe }) => {
    const { classes } = useStyles();
    const src = useAppSelector(state => state.recipeData?.googleImagesData[0]?.url);
    const googleImagesData = useAppSelector(state => state.recipeData.googleImagesData);
    const dispatch = useAppDispatch();

    function swapImage() {
        // If the image data storage is empty, fetch more images.
        // If it's not empty, swap to the next image.
        if (googleImagesData.length === 0) {
            dispatch(fetchGoogleImages(recipeName));
            return;
        }
        dispatch(nextImage());
    }
    
    return (<>
        <Paper shadow="xl">
            <Container style={{ display: 'flex' }}>
                <Image
                    radius="md"
                    src={src}
                    alt="Random unsplash image"
                    width={200}
                    onClick={() => swapImage()}
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
                    {ingredients ? 
                        // current.charAt(0).toUpperCase only upper casesthe first char of every element of the array
                        ingredients.reduce((prev, current) => `${current.charAt(0).toUpperCase() + current.slice(1)}, ${prev}`, '')
                        : 
                        'Ingredients not available'
                    }
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
            <Container styles={{ width: '90%' }}>
                <Button className={classes.buttons} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Test</Button>
                <Button className={classes.buttons} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Test</Button>
                <Button className={classes.buttons} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Test</Button>
            </Container>

        </Paper>
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
        </>);
}

export default RecipeComponent;