import React, { useContext, useState } from 'react'
import { Grid } from '@mui/material'
import MenuHeader from './chats/menu/MenuHeader'
import Search from './chats/menu/Search'
import EmptyChat from './chats/EmptyChat'
import Conversations from './chats/menu/Conversations'
import ChatBox from './chats/chat/ChatBox'
import { AccountContext } from '../context/AccountProvider' 


const ChatDialog = () => {
  const {person} = useContext(AccountContext);
  const [text, setText] = useState("");

  return (
    <>
      <Grid container >
         <Grid item  sx = {{ width: '30%', backgroundColor: '#fff' }} >
            <MenuHeader />
            <Search setText={setText} />
            <Conversations text={text} />
         </Grid>

         <Grid item  sx = {{ width: '70%' }} >
            { Object.keys(person).length ? <ChatBox /> :  <EmptyChat />  }  
            
         </Grid>

      </Grid>
    </>
  )
}

export default ChatDialog
