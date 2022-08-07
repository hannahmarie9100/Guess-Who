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
      console.log("NEW BOARD GAME: ", newBoardGame)
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
      messages, characters, plrToMove, winner
    } = {
      messages: [],
      characters: {},
      plrToMove: "",
      winner: null
    },
  } = boardGame;

  console.log(boardGame);

  function getTitleText() {
    if (winner)
      return `${winner.username} won!`
    if (selectMode && (characters && Object.keys(characters).length !== 2))
      return "Select your character!"
    else if (characters && Object.keys(characters).length < 2)
      return "Waiting on other player..."
    else if (guessMode)
      return "Guess the other player's character!"
    return ""
  }

  useEffect(() => {
    if (characters && (Object.keys(characters).length === 2))
      setSelectMode(false)
  }, [characters])

  return <Box sx={{ backgroundColor: "#EDF1F5", width: "100vw", height: "100vh", overflow: "hidden" }} display="flex" justifyContent="center" alignItems="center"><Stack direction="row" spacing={2} alignItems="center">
    <Cellphone player={player} messages={messages} plrToMove={plrToMove} winner={winner}></Cellphone>
    <Stack direction="column" space={4} justifyContent="center" alignItems="center">
      <Box sx={{ height: "10vh", display: "flex", alignItems: "center" }}><Typography variant="h4">{getTitleText()}</Typography></Box>
      <Board selectMode={selectMode} setSelectMode={setSelectMode} guessMode={guessMode} setGuessMode={setGuessMode} selectedCharacter={player && characters && characters[player.id] ? characters[player.id] : null}></Board>
      <GuessButton guessMode={guessMode} setGuessMode={setGuessMode}></GuessButton>
    </Stack>
  </Stack>
  <ErrorSnackbar />
  </Box>;
}

export default App;