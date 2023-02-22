import { useState } from 'react';
import { createStyles, Header, Container, TextInput, ActionIcon } from '@mantine/core';
import { RiAtLine } from 'react-icons/ri';
import { GrFormAdd } from "react-icons/gr";
import { useAppDispatch } from '../app/hooks';
import { addIngredient } from '../features/counter/ingredients/ingredientsSlice';

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
    height: '100%',
  },
  textInput: {
    marginLeft: 30,
    width: '70%'
  },
  inputButton: {
    margin: 10,
    height: 36,
    width: 36,
    borderRadius: 10
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
        <RiAtLine size={28} />
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
          <GrFormAdd size={30} />
        </ActionIcon>
      </Container>
    </Header>
  );
}

export default MainHeader;