import { Container, createStyles } from '@mantine/core';
import * as React from 'react';
import MainIngredients from './MainIngredients';
import MainRecipe from './MainRecipes';

const useStyles = createStyles((theme) => ({
    root: {
        maxWidth: '60%',
        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%'
        },
    
    }
}));

const HomeContent: React.FunctionComponent = () => {
    const { classes } = useStyles();
    return (
        <Container className={classes.root}>
            <MainIngredients />
            <MainRecipe />
        </Container>
    );
}

export default HomeContent;