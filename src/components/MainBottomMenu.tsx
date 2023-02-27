import { createStyles } from '@mantine/styles';
import { Flex, ActionIcon } from '@mantine/core';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ICON_SIZE = 24;

const useStyles = createStyles({
    toolbar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: 'white',
        borderTop: "1px solid black"
    },
    button: {
        width: '30%',
        marginLeft: 5,
        marginRight: 5,
    }
});

const MainButtonMenu = () => {
    const { classes } = useStyles();

    return (
        <Flex
            className={classes.toolbar}
            align="center"
            justify="center"
        >
            <ActionIcon className={classes.button}>
                <Link to={'/'}>
                    <AiOutlineHome size={ICON_SIZE} color='gray'/>
                </Link>
            </ActionIcon>
            <ActionIcon className={classes.button}>
                <Link to={'/savedrecipes'} >
                    <FaRegBookmark size={ICON_SIZE - 5} color='gray'/>
                </Link>
            </ActionIcon>
            <ActionIcon className={classes.button}>
                <Link to={'/settings'} >
                    <FiSettings size={ICON_SIZE} color='gray'/>
                </Link>
            </ActionIcon>
        </Flex>
    );
};

export default MainButtonMenu;