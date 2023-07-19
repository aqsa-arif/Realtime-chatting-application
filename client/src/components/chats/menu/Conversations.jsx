import React, { useContext, useEffect, useState } from 'react'
import Conversation from './Conversation';
import { Box,  Typography } from '@mui/material';
import { getUsers } from '../../../api/api';
import { AccountContext } from '../../../context/AccountProvider';


const Conversations = ({text}) => {
    const [users, setUsers] = useState([]);
    const {account, socketRef, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchUsers = async() => {
            const records = await getUsers();  
            const filtered = records.filter(user => user.name.toLowerCase().includes(text.toLowerCase()) ); 
            setUsers(filtered);  
        }
        fetchUsers();
    },[text]); 

    useEffect(() => {
      socketRef.current.emit('addUsers', account );
      socketRef.current.on('getUsers', users => {
        setActiveUsers(users);
      })
    },[account]);


  return (
     <Box  sx={{
        height: '500px',
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
        {
            users ?  users.map((user, index) => {
                return  user.sub !== account.sub  && 
                <Box key={index}>
                <Conversation user={user} > </Conversation>
                {/* <Divider sx={{
                    color: '#e9edef',
                    marginLeft: '7.7rem',
                    opacity: '.6rem',
                }} /> */}
            </Box> 
            })
            :  
            <Typography >No Chats Yet</Typography>
        } 

     </Box>
  )
}

export default Conversations
