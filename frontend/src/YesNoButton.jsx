import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function YesNoButton({ buttonText }) {
    return <Button
        sx={{
            width: 50,
            height: 25,
            color: "#ffffff",
            margin: "15px",
            backgroundColor: buttonText === "Yes" ? "#9FF3B2" : "#F39F9F"
        }}
    >
        {buttonText}
    </Button>
}

export default YesNoButton