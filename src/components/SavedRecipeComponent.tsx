import { Container, Paper, Text, Image, Title, Button, Space, Collapse, Tooltip } from '@mantine/core';
import { List } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import * as React from 'react';
import { TbChevronUp } from 'react-icons/tb';
import { useAppDispatch } from '../app/hooks';
import { removeFromSavedRecipesStorage } from '../features/recipe/recipeDataSlice';
import { RecipeComponentProps } from './RecipeComponent';
import { BsTrashFill } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #2a408e, #318bda)',
        color: 'white',
        [theme.fn.smallerThan('md')]: {
            padding: '1em'
        },
        position: 'relative'
    },
    buttons: {
        width: '100%',
        height: '3em',
        margin: '0.1em'
    },
    listItems: {
        color: 'white',
        opacity: 1,
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
    },
    deleteButton: {
        position: 'absolute',
        top: '15px',
        left: '90%',
        fontSize: 40,
        zIndex: 10,
        transition: 'color 200ms ease',
        cursor: 'pointer',
        '&:hover': {
            color: '#f83131'
        },
        [theme.fn.smallerThan('md')]: {
            top: '10px',
            left: '81%',
            fontSize: 35,
        }
    }
}));

interface SavedRecipeComponentProps extends RecipeComponentProps {
    src: string;
}

const SavedRecipeComponent: React.FunctionComponent<SavedRecipeComponentProps> = ({ recipeName, cookTime, ingredients, recipe, id, src }) => {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    function handleRecipeDelete(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        // The stopPrepagation method is called to stop the event propagation
        // from the Paper component, wich would cause the whole recipe card
        // to open, when we only want to swap the image.
        e.stopPropagation();
        dispatch(removeFromSavedRecipesStorage(id));
    }

    return (<>
        <Paper p="lg" radius="md" shadow="xl" className={classes.root}
            onClick={() => setOpened(prev => !prev)}
        >
            <Container style={{ display: 'flex' }}>
                <Image
                    radius="md"
                    src={src}
                    alt="Random unsplash image"
                    className={classes.image}
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
                        // current.charAt(0).toUpperCase only upper cases the first char of every element of the array
                        ingredients.reduce((prev, current) => `${current.charAt(0).toUpperCase() + current.slice(1)}, ${prev}`, '')
                    }
                </Text>
            </Container>
            <Container>
                <Collapse in={opened}>

                    <Title order={3} mt={5}>
                        Preparation
                    </Title>
                    <Text>
                        <List>
                            {
                                recipe.map(recipeItem => <List.Item className={classes.listItems} key={recipeItem}>{recipeItem}</List.Item>)
                            }
                        </List>
                    </Text>
                </Collapse>
            </Container>
            <Container className={classes.chevron}
                style={{
                    transform: opened ? `rotate(180deg)` : 'none',
                }}
            >
                <TbChevronUp size={30} />
            </Container>
            <Tooltip label="Delete recipe from bookmarks">
                <Container className={classes.deleteButton}
                    onClick={handleRecipeDelete}
                >
                    <BsTrashFill />
                </Container>
            </Tooltip>
        </Paper>
        <Space h='xl' />
    </>);
}

export default SavedRecipeComponent;