import { Avatar, Box, Dialog, Grid,  List, ListItem, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import  qrCodeImage  from '../images/qrcode.jpg'; 
import  WhatsAppLogo  from '../images/whatsapp_logo.png';
import { GoogleLogin } from '@react-oauth/google'; 
import  jwt_decode  from 'jwt-decode';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../api/api';


const dialogStyle = {
    padding:
      {
        lg: '5.8rem 5.2rem 5.2rem' ,
        md: '4.8rem 3.2rem 3.2rem' ,
        sm: '3rem 3rem 3rem' ,
        xs: '2.8rem 2.2rem 2.2rem' ,
      },    
    overflow: 'hidden',  
    backgroundColor: '#fff' ,
    marginTop: {
        md:  '0',
        sm: '15rem'
    },
    borderRadius: '.3rem',
    width: {
        lg:  '66%',
        md:  '80%',
        sm: '90%'
    },
    maxWidth: '100%', 
}

const Title = styled(Typography)`
    margin-bottom: 2.4rem;
    font-size: 2.8rem;
    font-weight: 300; 
    color: #41525d; 
    font-family: Segoe UI
`
const DialogList = styled(List)`
    & > li {
        font-size: 1.8rem;
        line-height: 2.8rem; 
        color: #3B4A54;
    }
`
const  QRcode = styled('img')({
    width : '100%' 
})
 
const imgbox = {
    display: 'flex',
    justifyContent:  'center' 
}

const googledialog = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '0%', 
    top: '0%',
    width: '100%',
    height: '100%'
}

const LoginDialog = () => { 

    const {setAccount} = useContext(AccountContext);
    
    const LoginSuccess = async (res) => { 
        const decode = jwt_decode(res.credential); 
        setAccount(decode);
        await addUser(decode);
        localStorage.setItem('credential', JSON.stringify(decode));
    }

    const  LoginError = (res) => {
        console.log('Login Failed', res);
    }

  return ( 
    <>
        <Box sx={{
                margin: {
                    lg: '27px 0 28px 18rem',
                    md: '21px 0 22px 11rem',
                    sm: '11px 0 12px 5rem', 
                },
                display: {
                    sm: 'flex',
                    xs: 'none', 
                },
                gap: '1.5rem',
                alignItems: 'center', 
                position: 'relative',
                zIndex: '9999',
        }}>
            <Avatar src={WhatsAppLogo} alt = "Whatsapp Web" variant='square'
            sx={{
                width: '3.9rem',
                height: '3.9rem',
            }}></Avatar>
            <Typography sx={{
                color: '#fff',
                fontFamily: 'Segoe UI',
                fontSize: '1.4rem',
                fontWeight: '500',
                textTransform: 'uppercase',
            }}>
                Whatsapp Web</Typography>

        </Box>

        <Dialog  open={true}
         PaperProps={{ sx: dialogStyle }}
         hideBackdrop={true}  
          >
            
            <Grid container spacing={4} 
             justifyContent="space-between"
             alignItems="center" >
                <Grid item md={8} >
                <Title> Use Whatsapp on your Computer </Title>

                <DialogList>
                    <ListItem >1. Access WhatsApp Clone application on your computer</ListItem>
                    <ListItem >2. Tap on the <Typography 
                    sx={{fontWeight: '500', 
                    fontSize: '1.8rem', 
                     margin: '0 .5rem', 
                     fontFamily: 'Segoe UI',
                     lineHeight: '2.4rem' }} > 
                     "Sign in with Google"</Typography>  option.</ListItem>
                    <ListItem sx={{display: 'flex'}}>3. A dialogue box will appear, showing a list of Gmail accounts associated with the device.
                     </ListItem>

                    <ListItem >4.  Select the desired Gmail account to log in to your WhatsApp Clone application.</ListItem>
                </DialogList>

                </Grid>

                <Grid item md={4} sm={12} 
                   sx={imgbox}
                   container
                 >
                   <Box 
                    style={{ position: 'relative' }}
                    sx={{ width: { sm: '29rem', xs: '27rem' } }} >
                          <QRcode src={qrCodeImage} alt="QR code" /> 
                      <Box sx={googledialog} >
                        <GoogleLogin  
                        onSuccess={LoginSuccess}
                        onError={LoginError}
                        /> 
                      </Box>

                   </Box>

                </Grid>
            </Grid>

        </Dialog>
    </>
  )
}

export default LoginDialog
