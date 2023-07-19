import React, { useContext, useState, useEffect } from 'react'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { AccountContext } from '../../../context/AccountProvider'
import { addConversation } from '../../../api/api' 
import styleTime from '../StyleTime'
import getOriginalFileName from '../FormatFileName'

const Conversation = ({user}) => {
    const { setPerson, account, setConversation, msgflag} = useContext(AccountContext);
    const [message, setMessage ] = useState({});

    useEffect(() => {
        const getConversatoion = async () =>{
           const data = await addConversation({senderId: account.sub, recieverId: user.sub });
           setMessage({value: data?.message, timestamp: data?.updatedAt });
        }  
        getConversatoion();
         // eslint-disable-next-line
    },[msgflag]);  

    const ActivateChat = async () => {
        setPerson(user);
        const response = await addConversation({ senderId: account.sub , recieverId: user.sub });
        await setConversation(response);
    }

    const truncateUrl = (url, maxLength) => {
        if(url){
            if (url.length > maxLength) {
              return url.substring(0, maxLength) + '...';
            }
            return url;
        }
        return "";
    };

  return (
    <Grid container sx={{
        height: '7.2rem',
        cursor: 'pointer',
    }} 
    onClick={() => ActivateChat() }
    >
        <Box sx={{ 
            padding: '0 1.5rem 0 1.3rem',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Avatar src={user.picture} alt='DP' sx={{
                width: '4.9rem',
                height: '4.9rem',
            }}></Avatar>
        </Box>

        <Box sx={{
            paddingRight: '15px',
            width: '76%',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',            
            borderBottom: '1px solid #E9EDEF',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography sx={{
                    color: '#111B21',
                    fontFamily: 'Segoe UI',
                    fontSize: '1.7rem',
                    fontWeight: '400',
                }}>
                    {user.name}
                </Typography>

                <Typography sx={{
                    color: '#111B21',
                    fontFamily: 'Segoe UI',
                    fontSize: '1.2rem',
                    fontWeight: '400',
                }}>
                     { message?.value && styleTime(message?.timestamp) } 
                </Typography>

            </Box>

            <Box sx={{
                marginTop: '.2rem',
            }}>
                <Typography sx={{
                    color: '#667781',
                    fontFamily: 'Segoe UI',
                    fontSize: '14px',
                    fontWeight: '400',
                }}>
                 { message?.value?.includes('http') ? truncateUrl(getOriginalFileName(message.value), 30) :  truncateUrl(message.value, 20)  }
                </Typography>
            </Box>
            
        </Box>
    </Grid>
  )
}

export default Conversation
