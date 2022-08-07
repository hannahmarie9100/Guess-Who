import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack, TextField } from '@mui/material';
import ChatMsg from './ChatMsg';


const Cellphone = ()  => {
    return <Box
        sx={{
            width: 400,
            height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "25px",
            padding: "30px 15px"
        }}
    >
        <Box>
            <Stack>
                <ChatMsg
                    msg="How radsfjiddddddddddddddddddddddddddaajklaj ifi u"
                />
                <ChatMsg
                    msg="How r u"
                    isPlayer
                />
            </Stack>
        </Box>
        <Box
            sx={{
                width: 350,
                height: 50,
                backgroundColor: "#dce1e6",
                borderRadius: "25px",
                margin: "20px"
            }}
        >
            <TextField
                fullWidth
                placeholder="Enter your question here"
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                }}
            />
        </Box>
    </Box>
}

export default Cellphone;