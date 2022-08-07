import React, { useState, useEffect } from 'react';
import { ThemeProvider, Typography, Stack, Box } from '@mui/material';

import client, { events } from '@urturn/client';
import theme from './theme';
import Cellphone from './Cellphone';
import Board from './Board';
import GuessButton from './GuessButton';

function App() {
  const [boardGame, setBoardGame] = useState(client.getBoardGame() || {});
  const [player, setPlayer] = useState(null);
  const [selectMode, setSelectMode] = useState(true)

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
  }, [])

  return <Box sx={{ backgroundColor: "#EDF1F5", width: "100vw", height: "100vh", overflow: "hidden" }}><Stack direction="row" spacing={2} alignItems="center">
    <Cellphone player={player} messages={messages}></Cellphone>
    <Stack direction="column" space={4} >
      <Typography variant="h2">{getTitleText()}</Typography>
      <Board selectMode={selectMode} setSelectMode={setSelectMode}></Board>
      <GuessButton></GuessButton>
    </Stack>
  </Stack> </Box>;
}

export default App;