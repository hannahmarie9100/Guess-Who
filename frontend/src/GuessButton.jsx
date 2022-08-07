import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function GuessButton({ guessMode, setGuessMode }) {
    return <Button
        sx={{
            width: 100,
            height: 50,
            backgroundColor: "#69B7FF",
            margin: "15px",
            color: "white"
        }}
        onClick={() => setGuessMode(guessMode)}
    >
        {guessMode ? "Cancel" : "Guess"}
    </Button>
}

export default GuessButton