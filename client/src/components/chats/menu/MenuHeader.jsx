import { Grid, styled } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import ChatIcon from '@mui/icons-material/Chat'; 
import SideMenu from './SideMenu';
import Profile from './Profile';

const menuStyle = {
  padding: '1rem 1.6rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#F0F2F5',
  height: '5.9rem',
  borderRight: '1px solid #F0F2F5',
}

const DPImg = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  cursor: 'pointer'
})

const MenuHeader = () => {
  const { account } = useContext(AccountContext);

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Grid container sx={menuStyle}>
      <Grid item >
        <DPImg src={account.picture} alt="DP"
          onClick={() => setDrawerOpen(true)} />
      </Grid>

      <Grid item
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: {
            lg: '3.5rem',
            md: '3rem',
            sm: '2.5rem'
          }
        }} > 
        <ChatIcon fontSize='large'
          sx={{ cursor: 'pointer', fontSize: '2.4rem' }} htmlColor='#54656f' />
        <SideMenu setDrawerOpen={setDrawerOpen}   />
      </Grid>

      <Profile
        drawerOpen = {drawerOpen} setDrawerOpen={setDrawerOpen} 
       />

    </Grid>
  )
}

export default MenuHeader
