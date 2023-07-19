import React, { useContext, useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { Box } from '@mui/material';
import ChatFooter from './ChatFooter';
import { AccountContext } from '../../../context/AccountProvider';
import { sendMessage, directFile } from '../../../api/api';
import getOriginalFileName from '../FormatFileName';

const ChatBox = () => {
  const { person, conversation, account, socketRef, msgflag, setMsgflag } = useContext(AccountContext);
  const [value, setValue] = useState('');

  const [file, setFile] = useState();
  const [image, setImage] = useState('');


  const sanitizeFileName = (fileName) => { 
    return encodeURIComponent(fileName);
 };
 
 
  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        
        const data = new FormData();
        const sanitizedFileName = sanitizeFileName(file.name); // Sanitize the file name
        console.log(sanitizedFileName);
         data.append('name', file.name );
         data.append('file', file);
 
        const response = await directFile(data);  
        const replacedFileName = getOriginalFileName(response); 
        setImage(response); 

        if(response){ 
          setValue(replacedFileName);
        }
      };

      uploadFile();
    }
  }, [file]);

  const sendText = async (e) => { 
    if (e.which === 13  &&  value ) { 

     await forwardMessage();

    }
  };

  const forwardMessage = async () => {
    if(value){
      let message;
      if (file) { 
          message = {
            conversationId: conversation._id,
            senderId: account.sub,
            receiverId: person.sub,
            type: 'file',
            value: image,
          }; 
      } 
      else {  
         message = {
          conversationId: conversation._id,
          senderId: account.sub,
          receiverId: person.sub,
          type: 'text',
          value: value,
        };
    }

    socketRef.current.emit('sendMessage', message );

    await sendMessage(message);
    setValue('');
    setFile('');
    setImage('');
    setMsgflag((prev) => !prev);
   }
  }

  return (
    <Box>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} msgflag={msgflag} />
      <ChatFooter
        value={value}
        setValue={setValue}
        sendText={sendText}
        file={file}
        setFile={setFile}
        forwardMessage={forwardMessage}
      />
    </Box>
  );
};

export default ChatBox;










 