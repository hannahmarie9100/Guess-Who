import React from "react";
import Box from '@mui/material/Box';
import { useState } from "react";
import client from "@urturn/client";
import { MoveTypes } from "./types";

const Character = ({ id, selectMode, setSelectMode }) => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        console.log(selectMode)
        if (selectMode) {
            console.log({
                "type": MoveTypes.ChooseCharacter,
                "data": id
            })
            client.makeMove({
                "type": MoveTypes.ChooseCharacter,
                "data": id
            })
            setSelectMode(false)
        } else {
            setClicked(!clicked)
        }
    }
    return <Box sx={() => BoxStyles(clicked)} onClick={handleClick}><img src={`/imgs/${id}.svg`} style={{ height: "100%" }} /></Box>
}

const BoxStyles = (clicked) => ({
    width: "120px",
    height: "120px",
    "&:hover": {
        filter: "drop-shadow(8px 8px 4px #00000060)"
    },
    cursor: "pointer",
    opacity: clicked ? "20%" : "100%"
})

export default Character