import { Container, Paper, Text, Image, Title, Button, Space, Collapse, LoadingOverlay } from '@mantine/core';
import { List } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToSavedRecipesStorage, fetchGoogleImages, fetchRecipeData, nextImage, removeFromSavedRecipesStorage } from '../features/recipe/recipeDataSlice';
import { FaUndoAlt } from 'react-icons/fa';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { TbChevronUp } from 'react-icons/tb';
import { ActionIcon } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #2a408e, #318bda)',
        color: 'white',
        [theme.fn.smallerThan('md')]: {
            padding: '1em'
        },
        position: 'relative'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        margin: '1em',
        borderRadius: '10em',
        padding: 10,
        height: '4em',
        width: '4em',
        color: '#4675ef',
        fill: 'black',
        borderColor: '#4675ef',
        border: '2px solid #4675ef',
        '&:first-child': {
            color: '#ebbd5d',
            borderColor: '#ebbd5d',
            marginRight: '3em',
            '&:active': {
                color: 'white',
                backgroundColor: '#ebbd5d'
            }
        }
    },
    newRecipeButton: {
        transition: 'transform 200ms',
        '&:hover': {
            transform: 'rotate(180deg)'
        }
    },
    listItems: {
        color: 'white',
        opacity: 0.8
    },
    image: {
        cursor: 'pointer',
        maxWidth: 400,
    },
    chevron: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 200ms ease'
    }
}));

export interface RecipeComponentProps {
    recipeName: string;
    cookTime: string;
    ingredients: string[];
    recipe: string[];
    id: string;
}

const RecipeComponent: React.FunctionComponent<RecipeComponentProps> = ({ recipeName, cookTime, ingredients, recipe, id }) => {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState<boolean>(false);
    const src = useAppSelector(state => state.recipeData?.googleImagesData[0]?.url);
    const googleImagesData = useAppSelector(state => state.recipeData.googleImagesData);
    const savedRecipesMap = useAppSelector(state => state.recipeData.savedRecipesStorage);
    const recipeIngredients = useAppSelector(state => state.ingredients.ingredients);
    const isRecipeSaved = savedRecipesMap.find(recipe => recipe.id === id) === undefined ? false : true;
    const isLoading = useAppSelector(state => state.recipeData.recipeDataStatus) === 'fulfilled' ? false : true;
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

    function handleImageClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        // The stopPrepagation method is called to stop the event propagation
        // from the Paper component, wich would cause the whole recipe card
        // to open, when we only want to swap the image.
        e.stopPropagation();
        swapImage();
    }

    function handleBookmark() {
        if (isRecipeSaved) {
            dispatch(removeFromSavedRecipesStorage(id));
            return;
        }
        dispatch(addToSavedRecipesStorage({ recipeName, ingredients, cookTime, id, recipe, image: googleImagesData[0] }));
    }

    function lookForRecipe() {
        if (ingredients.length < 0) return;
        dispatch(fetchRecipeData(recipeIngredients.map(ingredient => ingredient.name)));
    }

    return (<>
        <Paper p="lg" radius="md" shadow="xl" className={classes.root}
            onClick={() => setOpened(prev => !prev)}
        >
            <LoadingOverlay visible={isLoading} overlayBlur={1} />
            <Container style={{ display: 'flex' }}>
                <Image
                    radius="md"
                    src={src}
                    fit="contain"
                    alt="Recipe image"
                    onClick={handleImageClick}
                    withPlaceholder
                    className={classes.image}
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
            <Collapse in={opened}>
                <Container>
                    <Title order={3} mt={5}>
                        Preparation
                    </Title>
                    <Text>
                        <List>
                            {recipe ?
                                recipe.map(recipeItem => <List.Item className={classes.listItems} key={recipeItem}>{recipeItem}</List.Item>) :
                                'Preparation not available'}
                        </List>
                    </Text>
                </Container>
            </Collapse>
            <Container className={classes.chevron}
                style={{
                    transform: opened ? `rotate(180deg)` : 'none',
                }}
            >
                <TbChevronUp size={30} />
            </Container>
        </Paper>
        <Container styles={{ width: '90%' }} className={classes.buttonContainer}>
            <ActionIcon
                className={classes.buttons}
                onClick={() => lookForRecipe()}
            >
                <FaUndoAlt size={60} />
            </ActionIcon>
            <ActionIcon
                className={classes.buttons}
                onClick={() => handleBookmark()}
            >
                {isRecipeSaved ? <BsBookmarkFill size={60}/> : <BsBookmark size={60}/>}
            </ActionIcon>
        </Container>
        <Space h='xl' />
        <Space h='xl' />
        <Space h='xl' />
    </>);
}

export default RecipeComponent;