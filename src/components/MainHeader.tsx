import { useState } from 'react';
import { createStyles, Header, Container, TextInput, ActionIcon } from '@mantine/core';
import { IoMdAdd } from "react-icons/io";
import { useAppDispatch } from '../app/hooks';
import { addIngredient } from '../features/ingredients/ingredientsSlice';
import FullLogo from './FullLogo';
import Logo from './Logo';

const HEADER_HEIGHT = 60;

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000) + 1;
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingRight: 0
  },
  textInput: {
    marginLeft: '5%',
    width: '70%'
  },
  inputButton: {
    background: 'linear-gradient(45deg, #2a408e, #318bda)',
    margin: "1em",
    height: 36,
    width: 36,
    borderRadius: 10,
  },
  fullLogo: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },
  logo: {
    display: 'none',
    [theme.fn.smallerThan('sm')]: {
      display: 'inline-block'
    }
  }

}));

const MainHeader: React.FunctionComponent = () =>{
  const { classes } = useStyles();
  const [input, setInput] = useState<string>('');
  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function addIngredientAndClearState() {
    dispatch(addIngredient({ id: getRandomNumber(), name: input }));
    setInput('');
  }

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <FullLogo fontSize={10} className={classes.fullLogo}/>
        <Logo fontSize={10} className={classes.logo} />
        <TextInput
          className={classes.textInput}
          placeholder="Add ingredients"
          withAsterisk
          onChange={handleChange}
          value={input}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            addIngredientAndClearState();
          }}
        />
        <ActionIcon
          variant="filled"
          color="white"
          className={classes.inputButton}
          onClick={() => addIngredientAndClearState()}
        >
          <IoMdAdd size={30}/>
        </ActionIcon>
      </Container>
    </Header>
  );
}

export default MainHeader;