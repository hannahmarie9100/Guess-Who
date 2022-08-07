import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Character from './Character';
import { Grid } from '@mui/material';

function Board({ selectMode, setSelectMode, guessMode, setGuessMode, selectedCharacter }) {
    const [characterImages, setCharacterImages] = useState([])
    const getRandomImages = () => {
        const images = [...Array(50).keys()];
        setCharacterImages(images.slice(1, 25).map(x => ('000' + x).substr(-3)));
    }

    useEffect(() => {
        getRandomImages()
    }, [])

    return <Box
        sx={{
            width: "725px",
            height: "70vh",
            maxHeight: "600px",
            backgroundColor: "#ffffff",
            borderRadius: "25px",
            padding: "30px",
            filter: guessMode ? "drop-shadow(8px 8px 4px #00000060)" : ""
        }}
    >
        <Grid container spacing={2}>
            {characterImages.map((id) => <Grid item><Character id={id} selectMode={selectMode} setSelectMode={setSelectMode} guessMode={guessMode} setGuessMode={setGuessMode} isCharacter={selectedCharacter && selectedCharacter === id}></Character></Grid>)}
        </Grid>
    </Box>
}

export default Board;