import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function Board() {
    const getRandomImages = () => {
        const images = [...Array(50).keys()];
        const shuffled = images.sort((a, b) => 0.5 - Math.random());
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
        {getRandomImages().map((id) => <img src={`/imgs/${id}.svg`} />)}
    </Box>
}

export default Board;