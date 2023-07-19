import React, { useContext } from 'react'
import { Avatar, Box, Icon, Typography } from '@mui/material' 
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AccountContext } from '../../../context/AccountProvider';

const ChatHeader = ({person}) => {
  const {activeUsers} = useContext(AccountContext);

  return (
    <Box sx={{
      borderLeft: '1px solid #d1d7db',
      padding: '8px 16px',
      backgroundColor: '#F0F2F5',
      display: 'flex',
      alignItems: 'center',
    }}>

       <Box sx={{
         padding: '0 15px 0 0',
         cursor: 'pointer',
       }}>
          <Avatar src={person.picture} alt='DP' sx={{
            height: '40px',
            width: '40px',
          }} ></Avatar>
       </Box>

       <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
       }}>
          <Typography sx={{
            fontFamily: 'Segoe UI',
            fontSize: '1.6rem',
            color: '#111b21',

          }}>
            {person.name}
          </Typography>
          <Typography sx={{
            color: '#667781',
            fontSize: '13px',
            fontFamily: 'Segoe UI',
            fontWeight:'400',
          }}> 
          {
           activeUsers?.find(user => user.sub === person.sub) ? "online" : "offline"
          }          
          </Typography>

       </Box>

       {/* <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
       }}>
           <SearchIcon sx={{
              padding: '.8rem',
              cursor: 'pointer',
              color: '#54656f',
              fontSize: '24px'
           }} /> 

           <MoreVertIcon sx={{
              padding: '.8rem',
              cursor: 'pointer',
              marginLeft: '10px',
              color: '#54656f',
              fontSize: '24px',
           }} /> 
       </Box> */}

    </Box>
  )
}

export default ChatHeader
