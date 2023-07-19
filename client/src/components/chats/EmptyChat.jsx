import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import  emptyChatImage  from '../../images/whatsapp_multi_device_support.png';
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock';

const EmptyChat = () => {
  return (
    <Grid sx={{
      backgroundColor: '#F0F2F5',
      width: '100%',
      height: '100vh',
      borderLeft: '1px solid #e9edef',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
 
     <Avatar alt="Chatting" src={emptyChatImage} variant='square'  sx={{ 
            width: '40.5rem',
            height: '20.5rem',
            marginTop: '-2rem',
      }} /> 
 

      <Box sx={{ 
         textAlign: 'center',
      }}>
         <Typography  sx={{
            fontSize: '3.2rem',
            fontWeight: '300',
            fontFamily: 'Segoe UI',
            lineHeight: '3.7rem',
            color:  '#41525d',
            marginTop: '4rem',
            marginBottom: '1.6rem',
         }}>  WhatsApp Web  </Typography>

         <Typography sx={{
          fontSize: '14px',
          fontWeight: '400',
          fontFamily: 'Segoe UI',
          lineHeight: '20px',
          color:  '#667781',
         }}>
            Send and receive messages without keeping your phone online.
          </Typography>

         <Typography sx={{
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '20px',
          fontFamily: 'Segoe UI',
          color:  '#667781',
         }}>
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </Typography>

      </Box> 

      <Box sx={{
          display: 'flex',
          gap: '.5rem',
          alignItems: 'center',
          position: 'absolute',
          bottom: '40px' ,
      }}>
         <LockIcon   sx={{ 
          fontSize: '1.2rem',
          fontWeight: '400',
          lineHeight: '2rem',
          fontFamily: 'Segoe UI',
          color:  '#8696a0',
         }}/>

         <Typography sx={{
          fontSize: '1.4rem',
          fontWeight: '400',
          lineHeight: '2rem',
          fontFamily: 'Segoe UI',
          color:  '#8696a0',
         }}>
          End-to-end encrypted
          </Typography>
      </Box>



      <Box
        component="div"
        sx={{
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0', 
          width: '100%', 
          borderBottom: '.6rem solid #25d366',  
          zIndex: 1, 
        }}
      />


    </Grid>
  )
}

export default EmptyChat
