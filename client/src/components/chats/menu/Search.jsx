import { Box, Grid, InputBase } from '@mui/material'
import React from 'react'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

 

const Search = ({setText}) => {
  return (
    <Box sx={{
      backgroundColor: '#fff', 
      padding:  '0 1.3rem',      
      borderBottom: '1px solid #E9EDEF',
    }}>
       <Grid sx={{
        width: '95%',
        marginTop: '.7rem',
        marginBottom: '.7rem',
        backgroundColor: '#F0F2F5',
        borderRadius: '1rem',
        padding: '.5rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '3.5rem',
       }}>
          <SearchSharpIcon fontSize='larger' htmlColor='#54656F' />

          <InputBase placeholder='Search or start new chat' 
           inputProps={{ sx: {
             fontSize: '1.3rem', 
           } }} 
           onChange={(e) => setText(e.target.value) } />
          
       </Grid>

    </Box>
  )
}

export default Search

