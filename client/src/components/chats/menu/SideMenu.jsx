import React, { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { AccountContext } from '../../../context/AccountProvider';


const menuItemStyle = {
    paddingRight:  '58px',
    paddingLeft:   '24px',
    fontSize: '14.5px',
    color: '3b4a54',
    height: '40px',
}

const SideMenu = ({setDrawerOpen}) => {
    const {setAccount} = useContext(AccountContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
      < MoreVertIcon fontSize='large'  htmlColor='#54656f'
       onClick={handleClick}   
        sx={{ cursor: 'pointer', fontSize: '2.4rem' }}
        />  
      <Menu 
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose} 
        anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
            handleClose();
            setDrawerOpen(true);
        }}
          sx={menuItemStyle} > 
           Profile 
         </MenuItem> 

        <MenuItem  onClick={() => {
            handleClose(); 
            setAccount(null);
            localStorage.removeItem('credential');
        }}
         sx={menuItemStyle}  >
          Logout
        </MenuItem>
      </Menu>
       
    </div>
  )
}

export default SideMenu
