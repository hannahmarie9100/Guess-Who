import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';


function Cellphone() {
    return <Box
        sx={{
            width: 400,
            height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "25px",
            padding: "5px"
        }}
    >
        <Box>
            <ChatMsg
                avatar={''}
                messages={[
                    'Hi Jenny, How r u today?',
                    'Did you train yesterday',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
                ]}
            />
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