import { Box, Typography } from '@mui/material';
import React from 'react';

const emojis = ['😀','😚','😐','😅','🤯','😓','😒','😔','😏','🤐','😷','😡','😠','😪','🤑','😨','😮','😄','😁','😆','😅','🤣','😂','🙂','🙃','😍','😘','🥰','😗','🤨','💗','🥺','😳','😄','😆','🥰','😘','😎','😋','😉','🤩','😥','🙄','🥱','😴','😛','😜','😲','😖','😤','😕','🥵','😡','😱','😭','🤪','😰','👿','😈','🤡','👺','👹','👻','👽','🧐','😇','🙏🏻','😻','😹','🙈','🙊','❤',];

const EmojiPicker = ({ onEmojiClick }) => {
  return (
    <Box sx={{
        width: '52rem',
        height: '21.5rem',
        display: 'flex',
        marginBottom: '20rem',
        flexWrap: 'wrap',
        position: 'relative',  
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '1rem', 
        gap: '1rem',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#CED0D1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#CED0D1',
        },
    }}>
      {emojis.map((emoji) => (
        <Typography
          key={emoji}
          onClick={() => onEmojiClick(emoji)}
          style={{ cursor: 'pointer', fontSize: '2.3rem' }}
        >
          {emoji}
        </Typography>
      ))}
    </Box>
  );
};

export default EmojiPicker;
