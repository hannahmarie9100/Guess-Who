import React from "react";
import Box from '@mui/material/Box';
import { useState } from "react";
import client from "@urturn/client";
import { MoveTypes } from "./types";
import { useErrorContext } from "./contexts/useErrorContext";

const Character = ({ id, selectMode, setSelectMode, guessMode, setGuessMode, isCharacter }) => {
    const [clicked, setClicked] = useState(false)
    const { setError } = useErrorContext()
    const handleClick = async () => {
        console.log(selectMode)
        if (guessMode) {
            const { error } = await client.makeMove({
                "type": MoveTypes.Guess,
                "data": id
            })

            if (error) {
                setError(error.message);
            } else {
                setGuessMode(false)
            }
        }
        else if (selectMode) {
            const { error } = await client.makeMove({
                "type": MoveTypes.ChooseCharacter,
                "data": id
            })

            if (error) {
                setError(error.message);
            } else {
                setSelectMode(false)
            }
        } else {
            setClicked(!clicked)
        }
    }
    return <Box sx={() => BoxStyles(clicked, isCharacter)} onClick={handleClick}><img src={`https://raw.githubusercontent.com/hannahmarie9100/tictactoe/31c5ebf2e6c4602c0a344bc885983ef9d3fa58c3/frontend/public/imgs/${msg.slice(-3)}.svg`} style={{ height: "100%" }} /></Box>
}

const BoxStyles = (clicked, isCharacter) => ({
    width: "120px",
    height: "120px",
    "&:hover": {
        filter: "drop-shadow(8px 8px 4px #00000060)",
    },
    cursor: "pointer",
    opacity: clicked ? "20%" : "100%",
    filter: isCharacter ? "drop-shadow(8px 8px 4px #edd36f)" : ""
})

export default Character