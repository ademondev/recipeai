import { Container, Paper, Text, Image, Title, Button, Space } from '@mantine/core';
import { List } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToSavedRecipesStorage, fetchGoogleImages, nextImage, removeFromSavedRecipesStorage } from '../features/recipe/recipeDataSlice';
import { RecipeComponentProps } from './RecipeComponent';

const useStyles = createStyles((theme) => ({
    buttons: {
        width: '100%',
        height: '3em',
        margin: '0.1em'
    }
}));

interface SavedRecipeComponentProps extends RecipeComponentProps {
    src: string;
}

const SavedRecipeComponent: React.FunctionComponent<SavedRecipeComponentProps> = ({ recipeName, cookTime, ingredients, recipe, id, src }) => {
    const { classes } = useStyles();
    const savedRecipesMap = useAppSelector(state => state.recipeData.savedRecipesStorage);
    const dispatch = useAppDispatch();

    return (<>
        <Paper shadow="xl">
            <Container style={{ display: 'flex' }}>
                <Image
                    radius="md"
                    src={src}
                    alt="Random unsplash image"
                    width={200}
                />
                <Container>
                    <Title order={3}>
                        Name
                    </Title>
                    <Text>
                        {recipeName}
                    </Text>
                    <Title order={3}>
                        Cook time
                    </Title>
                    <Text>
                        {cookTime}
                    </Text>
                </Container>
            </Container>
            <Container>
                <Title order={3} mt={5}>
                    Required ingredients
                </Title>
                <Text>
                    {
                        // current.charAt(0).toUpperCase only upper casesthe first char of every element of the array
                        ingredients.reduce((prev, current) => `${current.charAt(0).toUpperCase() + current.slice(1)}, ${prev}`, '')
                    }
                </Text>
            </Container>
            <Container>
                <Title order={3} mt={5}>
                    Preparation
                </Title>
                <Text>
                    <List>
                        {
                            recipe.map(recipeItem => <List.Item key={recipeItem}>{recipeItem}</List.Item>)
                        }
                    </List>
                </Text>
            </Container>
            <Container styles={{ width: '90%' }}>
                <Button
                    className={classes.buttons}
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    onClick={() => console.log(savedRecipesMap)}
                >
                    Show saved recipes to the console
                </Button>
                <Button
                    className={classes.buttons}
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    onClick={() => dispatch(removeFromSavedRecipesStorage(id))}
                >
                    Delete this recipe from saved recipes
                </Button>
            </Container>

        </Paper>
        <Space h='xl' />
    </>);
}

export default SavedRecipeComponent;