import React from "react";
import Box from '@mui/material/Box';
import { useState } from "react";

const Character = ({ id }) => {
    const [clicked, setClicked] = useState(false)
    return <Box sx={() => BoxStyles(clicked)} onClick={() => setClicked(!clicked)}><img src={`/imgs/${id}.svg`} style={{ height: "100%" }} /></Box>
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