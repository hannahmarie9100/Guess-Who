import React, { useState, useEffect } from 'react';
import { ThemeProvider, Typography, Stack, Box } from '@mui/material';

import client, { events } from '@urturn/client';
import theme from './theme';
import Cellphone from './Cellphone';
import Board from './Board';
import GuessButton from './GuessButton';
import ErrorSnackbar from './ErrorSnackbar';

function App() {
  const [boardGame, setBoardGame] = useState(client.getBoardGame() || {});
  const [player, setPlayer] = useState(null);
  const [selectMode, setSelectMode] = useState(true)
  const [guessMode, setGuessMode] = useState(false);

  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setBoardGame(newBoardGame);
    };
    const getLocalPlayer = async () => {
      setPlayer(await client.getLocalPlayer());
    };

    getLocalPlayer();
    events.on('stateChanged', onStateChanged);
    return () => {
      events.off('stateChanged', onStateChanged);
    };
  }, []);

  const {
    state: {
      messages, characters
    } = {
      messages: [],
      characters: {}
    },
  } = boardGame;

  function getTitleText() {
    if (selectMode && (Object.keys(characters).length !== 2))
      return "Select your character!"
    else if (Object.keys(characters).length < 2)
      return "Waiting on other player..."

    return ""
  }

  useEffect(() => {
    if ((Object.keys(characters).length === 2))
      setSelectMode(false)
  }, [characters])

  return <Box sx={{ backgroundColor: "#EDF1F5", width: "100vw", height: "100vh", overflow: "hidden" }} display="flex" justifyContent="center" alignItems="center"><Stack direction="row" spacing={2} alignItems="center">
    <Cellphone player={player} messages={messages}></Cellphone>
    <Stack direction="column" space={4} justifyContent="center" alignItems="center">
      <Typography variant="h2">{getTitleText()}</Typography>
      <Board selectMode={selectMode} setSelectMode={setSelectMode} guessMode={guessMode} setGuessMode={setGuessMode} selectedCharacter={player && characters[player.id] ? characters[player.id] : null}></Board>
      <GuessButton setGuessMode={setGuessMode}></GuessButton>
    </Stack>
  </Stack>
  <ErrorSnackbar />
  </Box>;
}

export default App;