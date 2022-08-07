import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useErrorContext } from './contexts/useErrorContext';
import client from '@urturn/client';
import { MoveTypes } from './types';

function YesNoButton({ buttonText }) {
    const { setError } = useErrorContext();
    const handleClick = async () => {
        const { error } = await client.makeMove({
            "type": MoveTypes.Answer,
            "data": buttonText
        });

        if (error) {
            setError(error.message);
        }
    }
    return <Button
        sx={{
            width: 50,
            height: 25,
            color: "#ffffff",
            margin: "0px 10px",
            backgroundColor: buttonText === "Yes" ? "#9FF3B2" : "#F39F9F"
        }}
        onClick={handleClick}
    >
        {buttonText}
    </Button>
}

export default YesNoButton