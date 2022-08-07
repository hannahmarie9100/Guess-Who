import React from 'react';
import { Box, Typography } from '@mui/material';

const DefaultChatMsg = ({ msg, isPlayer }) => {
  // console.log(msg.data.slice(-3))
  return (
    <Box sx={{ display: 'flex', justifyContent: isPlayer ? 'flex-end' : 'flex-start' }}>
      <Typography
        align={'left'}
        sx={({ palette }) => ChatMsgStyles(palette, isPlayer)}
      >
        {msg && (/I guess \d{3}/).test(msg) ? <div>I guess <img src={`/imgs/${msg.slice(-3)}.svg`} style={{ marginTop: '5px', marginLeft: '5px', height: "50px" }} /></div> : msg}
      </Typography>
    </Box>
  )
};

const ChatMsgStyles = (palette, isPlayer) => ({
  padding: "5px 10px",
  maxWidth: "50%",
  borderRadius: '16px',
  marginBottom: '16px',
  display: 'inline-block',
  wordBreak: 'break-word',
  fontFamily:
    // eslint-disable-next-line max-len
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: '14px',
  borderTopRightRadius: isPlayer ? '0px' : '16px',
  borderTopLeftRadius: isPlayer ? '16px' : '0px',
  backgroundColor: isPlayer ? '#3f51b5' : palette.grey[300],
  color: isPlayer ? 'white' : 'black'
})

export default DefaultChatMsg;