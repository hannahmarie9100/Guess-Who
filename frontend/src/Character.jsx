import React from "react";
import Box from '@mui/material/Box';
import { useState } from "react";
import client from "@urturn/client";
import { MoveTypes } from "./types";

const Character = ({ id, selectMode, setSelectMode, guessMode, setGuessMode, isCharacter }) => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        console.log(selectMode)
        if (guessMode) {
            client.makeMove({
                "type": MoveTypes.Guess,
                "data": id
            })
            setGuessMode(false)
        }
        else if (selectMode) {
            client.makeMove({
                "type": MoveTypes.ChooseCharacter,
                "data": id
            })
            setSelectMode(false)
        } else {
            setClicked(!clicked)
        }
    }
    return <Box sx={() => BoxStyles(clicked, isCharacter)} onClick={handleClick}><img src={`/imgs/${id}.svg`} style={{ height: "100%" }} /></Box>
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