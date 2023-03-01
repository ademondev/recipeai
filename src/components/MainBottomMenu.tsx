import { createStyles } from '@mantine/styles';
import { Flex, ActionIcon, Container, Tooltip, UnstyledButton } from '@mantine/core';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeButtonMenuState } from '../features/bottomMenu/bottomMenuSlice';

const ICON_SIZE = 24;

const useStyles = createStyles((theme) => ({
    toolbar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: 'white',
        borderTop: "1px solid grey"
    },
    button: {
        width: '100%',
        height: '100%',
        marginLeft: 5,
        marginRight: 5,
        margin: 0,
        borderRadius: theme.radius.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },
    /*     active: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        }, */
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        color: '#228be6'
    },
    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface ButtonInterface {
    link: string,
    iconComponent: any,
    iconSize?: number
}

const buttons: ButtonInterface[] = [
    {
        link: '/',
        iconComponent: <AiOutlineHome />,
        iconSize: ICON_SIZE
    },
    {
        link: '/savedrecipes',
        iconComponent: <FaRegBookmark />,
        iconSize: ICON_SIZE - 5
    },
    {
        link: '/settings',
        iconComponent: <FiSettings />,
        iconSize: ICON_SIZE
    }
];

const MainButtonMenu = () => {
    const { classes, cx } = useStyles();
    const active = useAppSelector(state => state.bottomMenu.buttonMenuIndex);
    const dispatch = useAppDispatch();

    return (
        <Flex
            className={classes.toolbar}
            align="center"
            justify="center"
        >
            {buttons.map((button, index) => {
                return (
                    <Link to={button.link} className={cx(classes.button, classes.center, { [classes.active]: active === index })}
                        onClick={() => dispatch(changeButtonMenuState(index))}
                    >
                        <ActionIcon key={index} style={{ fontSize: button.iconSize }} 
                            className={cx({ [classes.link]: active === index})}
                        >
                            {button.iconComponent}
                        </ActionIcon>
                    </Link>
                );
            })}
        </Flex>
    );
};

export default MainButtonMenu;