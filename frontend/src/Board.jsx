import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Character from './Character';
import { Grid } from '@mui/material';

function Board() {
    const getRandomImages = () => {
        const images = [...Array(50).keys()];
        const shuffled = images.slice(1, 50).sort((a, b) => 0.5 - Math.random());
        return shuffled.slice(0, 24).map(x => ('000' + x).substr(-3));
    }

    return <Box
        sx={{
            width: 800,
            height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "25px"
        }}
    >
        <Grid container spacing={2}>
            {getRandomImages().map((id) => <Grid item><Character id={id}></Character></Grid>)}
        </Grid>
    </Box>
}

export default Board;