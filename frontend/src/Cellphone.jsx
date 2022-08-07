import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Stack, TextField } from '@mui/material';
import ChatMsg from './ChatMsg';
import SendIcon from '@mui/icons-material/Send';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'


const Cellphone = ()  => {
    return <Box
        sx={{
            width: 400,
            height: 600,
            backgroundColor: "#ffffff",
            borderRadius: "25px",
            padding: "30px 15px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Box sx={{ maxHeight: '88%', overflowY: 'scroll' }}>
            <Stack>
                <ChatMsg
                    msg="How radsfjiddddddddddddddddddddddddddaajklaj ifi u"
                />
                <ChatMsg
                    msg="How r u"
                    isPlayer
                />
                <ChatMsg
                    msg="How radsfjiddddddddddddddddddddddddddaajklaj ifi u"
                />
                <ChatMsg
                    msg="How r u"
                />
                <ChatMsg
                    msg="How radsfjiddddddddddddddddddddddddddaajklaj ifi u"
                    isPlayer
                />
                <ChatMsg
                    msg="How r u"
                    isPlayer
                />
                <ChatMsg
                    msg="How radsfjiddddddddddddddddddddddddddaajklaj ifi u"
                />
                <ChatMsg
                    msg="How r u"
                    isPlayer
                />
                <ChatMsg
                    msg="How radsfjiddddddddddddddddddddddddddaajklaj ifi u"
                />
                <ChatMsg
                    msg="How r u"
                    isPlayer
                />
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
            sx={({ palette }) => ({
                width: 350,
                height: 50,
                backgroundColor: palette.grey[300],
                borderRadius: "25px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '25px',
                padding: '10px 15px',
                fontSize: '144px'
            })}
        >
            <TextField
                fullWidth
                placeholder="Enter your question here"
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                    style: {
                        fontFamily:
                        // eslint-disable-next-line max-len
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: '14px',
                    },
                    endAdornment: <FontAwesomeIcon icon={ faCircleArrowRight } />
                }}
            />
        </Box>
    </Box>
}

export default Cellphone;