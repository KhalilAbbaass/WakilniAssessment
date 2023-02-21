import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const navButton = {
    textDecoration:'none',
    color:'black',
}
const navbarStyle = {
    backgroundColor:'#FDDA0D'
}
const typoStyle = {
    color:'black',
    fontWeight:'bold',

}
const Navbar = () => {
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={navbarStyle} position="static">
            <Toolbar>
                <Typography style={typoStyle} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     Product Inventory
                </Typography>
                <Button color="inherit"><Link to='/' style={navButton}>Product Type</Link></Button>
            </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar