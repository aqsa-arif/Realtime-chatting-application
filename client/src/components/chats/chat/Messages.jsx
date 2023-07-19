import React, { useContext, useRef, useState } from 'react'
import { Box } from '@mui/material'
import wallPaper from '../../../images/wallpaper.png';
import { useEffect } from 'react';
import { fetchAllMessages } from '../../../api/api';
import { AccountContext } from '../../../context/AccountProvider';
import Message from './Message';

const Messages = ({ person, msgflag }) => {

  const scrollRef = useRef();
  const { conversation, socketRef } = useContext(AccountContext);
  const [messages, setMessages] = useState([]); 
  const [incomingMessage, setIncomingMessage] = useState({});

  useEffect(() => {
    socketRef.current.on('getMessage', message => {
       setIncomingMessage({...message, createdAt :  Date.now()} );
    })
  },[])

  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages(prev => [...prev, incomingMessage ]); 
  },[incomingMessage, conversation]);

  useEffect(() => {
    const getAllMessages = async () => {
      const response = await fetchAllMessages(conversation._id);
      console.log(response);
      setMessages(response.messages);
      console.log(response);
    }
    conversation._id && getAllMessages();

  }, [person.sub, conversation._id, msgflag ]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({transition: 'smooth' });
  },[messages]);

  return ( 

    <Box   sx={{ 
      backgroundColor: '#efeae2',
      height: '80vh', 
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
      <Box
        sx={{
          height: '100%',
          position: 'relative', // Add position relative
        }}
      >
        <Box
          sx={{
            position: 'absolute', // Add position absolute
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${wallPaper})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '50%',
            opacity: 0.4, // Move opacity here
          }}
        />

        <Box sx={{ padding: '2rem 6.3rem 1rem 6.3rem', opacity: 1 }}>
          {messages &&
            messages.map((message, index) => {
              return <Message key={index} message={message} />;
            })}
            <Box ref={scrollRef}></Box>
        </Box>
      </Box>
    </Box>

  )
}

export default Messages
