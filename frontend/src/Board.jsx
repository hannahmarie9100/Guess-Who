import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Character from './Character';
import { Grid } from '@mui/material';

function Board({ selectMode, setSelectMode }) {
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
            width: 800,
            height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "25px"
        }}
    >
        <Grid container spacing={2}>
            {characterImages.map((id) => <Grid item><Character id={id} selectMode={selectMode} setSelectMode={setSelectMode}></Character></Grid>)}
        </Grid>
    </Box>
}

export default Board;