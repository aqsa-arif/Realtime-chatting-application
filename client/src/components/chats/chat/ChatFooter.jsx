import { Box, Input, InputBase, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'; 
import EmojiPicker from './EmojiPicker';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const ChatFooter = ({ value, setValue, sendText, setFile, file, forwardMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 

  const handleEmojiSelect = (emoji) => {
    setValue(value + emoji);
  };

  const handleEmojiIconClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <Box
      sx={{
        height: '5.5rem',
        backgroundColor: '#f0f2f5',
        padding: '.5rem 1.6rem',
        borderLeft: '1px solid #e9edef',
        display: 'flex',
        alignItems: 'center',
        gap: '1.6rem',
      }}
    >
      {
        !showEmojiPicker ?  <EmojiEmotionsOutlinedIcon
        sx={{
          color: '#54656f',
          fontSize: '2.8rem',
          cursor: 'pointer',
        }}
        onClick={handleEmojiIconClick}
      /> 
      : 
      <CloseIcon  sx={{
        color: '#54656f',
        fontSize: '2.8rem',
        cursor: 'pointer',
      }}
      onClick={handleEmojiIconClick}
      /> 
      }     

      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={handleEmojiSelect} />
      )}

      <InputLabel htmlFor='fileUpload' sx={{ width: '4.5rem' }} >
        <AttachFileIcon
          sx={{
            color: '#54656f',
            fontSize: '2.8rem',
            transform: 'rotate(40deg)',
            cursor: 'pointer',
          }}
        />

        <Input
          type='file'
          id='fileUpload'
          sx={{ display: 'none' }}
          file={file}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </InputLabel>

      <InputBase
        placeholder='Type a message'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          sendText(e);
          console.log(e);
        }}
        sx={{
          width: '100%',
          padding: '6px 12px',
          margin: '7px 8px',
          backgroundColor: '#fff',
          border: '1px solid #fff',
          borderRadius: '8px',
          minHeight: '20px',
          fontSize: '15px',
          fontWeight: '400',
          lineHeight: '20px',
        }}
      />

      <SendIcon
        sx={{
          color: '#54656f',
          fontSize: '2.8rem',
          cursor: 'pointer',
        }}
        onClick={() => forwardMessage() }
      />
    </Box>
  );
};

export default ChatFooter;









 