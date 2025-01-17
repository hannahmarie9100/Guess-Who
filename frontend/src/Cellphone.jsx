import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, IconButton, Stack, TextField } from '@mui/material';
import ChatMsg from './ChatMsg';
import client, { events } from '@urturn/client';
import { MoveTypes } from './types';
import { useErrorContext } from './contexts/useErrorContext';
import YesNoButton from './YesNoButton';

const Cellphone = ({ messages, player, plrToMove, winner }) => {
    const [question, setQuestion] = useState("")
    const { setError } = useErrorContext()
    const HandleQuestionChange = (event) => [setQuestion(event.target.value)]

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return <Box
        sx={{
            width: "25vw",
            height: "70vh",
            maxHeight: "600px",
            backgroundColor: "#ffffff",
            borderRadius: "25px",
            padding: "30px 15px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Box sx={{ width: "95%", height: "85%", overflowY: 'scroll', paddingRight: "10px", marginLeft: "10px" }}>
            <Stack>
                {messages.map((message) => <ChatMsg msg={message.message} isPlayer={message.sender === player.id} />)}
                {winner === null && messages.length > 0 && player && (plrToMove === player.id && messages[messages.length - 1].sender !== player.id)
                    ? <Stack direction="row">
                    <YesNoButton buttonText="Yes"></YesNoButton>
                    <YesNoButton buttonText="No"></YesNoButton>
                </Stack> : null}
                <div style={{ height: "5px" }} ref={messagesEndRef}></div>
            </Stack>
        </Box>
        <Box
            sx={({ palette }) => ({
                width: "90%",
                height: "10%",
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
                onKeyPress={async (ev) => {
                    if (ev.key === 'Enter') {
                      // Do code here
                      ev.preventDefault();
                      const { error } = await client.makeMove({
                        "type": MoveTypes.Question,
                        "data": question
                    });

                    if (error) {
                        setError(error.message);
                    } else {
                        setQuestion("");
                    }
                    }
                  }}
                disabled={winner !== null || (player && (plrToMove !== player.id))}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        fontFamily:
                            // eslint-disable-next-line max-len
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: '14px',
                    }
                }}
            />
        </Box>
    </Box>
}

export default Cellphone;