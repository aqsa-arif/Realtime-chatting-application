import React from 'react'
import { Drawer, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AccountContext } from '../../../context/AccountProvider';
import { useContext } from 'react';

const drawerStyle = {
     width: '30%',
     overflowX: 'hidden',
     backgroundColor: '#F0F2F5',
}

const Profile = ({ drawerOpen, setDrawerOpen }) => {
     const { account } = useContext(AccountContext);

     const closeDrawer = () => {
          setDrawerOpen(false);
     }

     return (
          <Drawer
               open={drawerOpen}
               onClose={closeDrawer}
               PaperProps={{ sx: drawerStyle }}
               hideBackdrop={true}
          >

               <Box sx={{
                    backgroundColor: '#008069',
                    height: '9.3rem',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '3rem',
                    paddingLeft: '2.3rem',
                    paddingBottom: '1.5rem',
               }}>
                    <ArrowBackIcon htmlColor='#fff'
                         sx={{
                              fontSize: '2.5rem',
                              cursor: 'pointer'
                         }}
                         onClick={() => setDrawerOpen(false)}
                    />
                    <Typography
                         sx={{
                              fontFamily: 'Segoe UI',
                              fontWeight: '500',
                              fontSize: '1.9rem',
                              color: '#fff',
                         }}
                    > Profile </Typography>
               </Box>

               <Box>
                    <Box sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         padding: '2.8rem ',
                         backgroundColor: '#F0F2F5',
                    }}>

                         <Box component='img' src={account.picture} alt='Profile Image'
                              sx={{
                                   width: '20rem',
                                   height: '20rem',
                                   borderRadius: '50%',
                              }}></Box>

                    </Box>

                    <Box sx={{
                         padding: '1.4rem 3rem 1px 3rem',
                         backgroundColor: '#fff', 
                         boxShadow: '0 1px 3px rgba(11,20,26,0.08)',
                    }}>
                         <Typography sx={{
                              marginBottom: '2rem',
                              color: '#008069',
                              fontSize:  '1.4rem',
                              lineHeight:  '2.1rem',
                              fontFamily: 'Segoe UI',
                         }}>
                              Your name  
                         </Typography>

                         <Typography  sx={{
                              marginBottom: '1.4rem',
                              color: 'rgb(59,74,84)',
                              fontSize:  '1.6rem',
                              lineHeight:  '2.1rem',
                              fontFamily: 'Segoe UI',
                         }}>
                              {account.name}
                         </Typography>
                    </Box>

                    <Box sx={{
                         padding: '1.4rem 2rem 2.8rem 3rem',
                         backgroundColor: '#F0F2F5', 
                    }}>
                         <Typography sx={{
                              color: '#667781',
                              fontSize: '1.4rem',
                              fontFamily: 'Segoe UI',
                         }}>
                              This is not your username or pin. This name will be visible to your WhatsApp contacts.
                         </Typography>
                    </Box>

                    <Box sx={{
                         backgroundColor: '#fff',
                         padding: '1.4rem 3rem 1rem 3rem', 
                         marginBottom: '1rem',
                    }}>

                         <Typography sx={{
                              marginBottom: '2rem',
                              color: '#008069',
                              fontSize:  '1.4rem',
                              lineHeight:  '2.1rem',
                              fontFamily: 'Segoe UI',
                         }}>
                              Your Email  
                         </Typography>

                         <Typography  sx={{
                              marginBottom: '1.4rem',
                              color: 'rgb(59,74,84)',
                              fontSize:  '1.6rem',
                              lineHeight:  '2.1rem',
                              fontFamily: 'Segoe UI',
                         }}>
                              {account.email}
                         </Typography>

                    </Box>
               </Box>

          </Drawer>
     )
}

export default Profile
