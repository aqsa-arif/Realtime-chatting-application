import React, { useContext } from 'react'
import LoginDialog from './LoginDialog'
import {AppBar, Box, Toolbar,  styled} from '@mui/material';
import ChatDialog from './ChatDialog';
import { AccountContext } from '../context/AccountProvider';


const Body = styled(Box)`  
   background-color: #F0F2F5;
`

const Navbar = styled(AppBar)`
   background-color: #00a884;
   height: 22rem;
   box-shadow: none;
` 
 

const LoginWhats = () => {

  const { account } = useContext(AccountContext); 
  console.log(account);
  return (
    <Body>
        {
          account  ? 
          <> 
            <ChatDialog />          
          </>
           :
           <>
            <Navbar>
              <Toolbar> 
              </Toolbar>
            </Navbar>

            <LoginDialog />          
          </>

        }

    </Body>
  )
}

export default LoginWhats
