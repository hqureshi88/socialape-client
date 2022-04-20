// import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

function Navbar() {
    return (
    <AppBar>
      <Toolbar className="nav-container">
        <Link to="/login"><Button color="inherit">Login</Button></Link>
        <Link to="/"><Button color="inherit">Home</Button></Link>
        <Link to="/signup"><Button color="inherit">Signup</Button></Link>
      </Toolbar>
    </AppBar>
    )
  }

export default Navbar;
