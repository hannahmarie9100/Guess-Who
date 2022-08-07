import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, IconButton, Stack, TextField } from '@mui/material';
import ChatMsg from './ChatMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import client, { events } from '@urturn/client';
import { MoveTypes } from './types';
import { useErrorContext } from './contexts/useErrorContext';

const Cellphone = ({ messages, player }) => {
    const [question, setQuestion] = useState("")
    const { setError } = useErrorContext()
    const HandleQuestionChange = (event) => [setQuestion(event.target.value)]

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
                {messages.map((message) => <ChatMsg msg={message.message} isPlayer={message.sender === player.id} />)}
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
                value={question}
                onChange={HandleQuestionChange}
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
                    endAdornment: (
                        <IconButton disabled={question === ""} onClick={async () => {
                            const { error } = await client.makeMove({
                                "type": MoveTypes.Question,
                                "data": question
                            });

                            if (error) {
                                setError(error.message);
                            }
                            setQuestion("");
                        }}>
                            <FontAwesomeIcon icon={faCircleArrowRight} />
                        </IconButton>)
                }}
            />
        </Box>
    </Box>
}

export default Cellphone;