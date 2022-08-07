import React, { useState, useEffect } from 'react';
import { ThemeProvider, Typography, Stack, Box } from '@mui/material';

import client, { events } from '@urturn/client';
import theme from './theme';
import Cellphone from './Cellphone';

function App() {
  const [boardGame, setBoardGame] = useState(client.getBoardGame() || {});
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setBoardGame(newBoardGame);
    };
    events.on('stateChanged', onStateChanged);
    return () => {
      events.off('stateChanged', onStateChanged);
    };
  }, []);

  console.log('boardGame:', boardGame);

  const {
    state
  } = boardGame;

  return <Cellphone />;
}

export default App;