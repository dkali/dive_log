import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Grid, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

require('firebase/auth')

function TopAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    firebase.auth().signOut();
    handleClose();
  }

  let location = useLocation();
  let screen = 'main';
  let title = 'Welcome to DiveLog';
  if (location.pathname.startsWith('/dive')) {
    screen = 'edit';
    title = 'Edit dive';
  }
  if (location.pathname === '/add_dive') {
    screen = 'add';
    title = 'Add new dive';
  }

  let user = firebase.auth().currentUser;

  const getLeftIcon = () => screen === 'edit' || screen === 'add' ?
    <NavLink to="/">
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
    </NavLink> :
    <IconButton>
      <SettingsIcon />
    </IconButton>

  const getProfileIcon = () => {
    if (user !== null) {
      if (user.photoURL !== null) {
        return <img src={user.photoURL} alt="user" style={{width: "35px"}}/>;
      }
      else {
        return <PersonIcon fontSize="large" />;
      }
    }
  }

  return (
      <AppBar color="primary" position="static">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          {getLeftIcon()}

          <Typography variant="h6">
            {title}
          </Typography>

          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {getProfileIcon()}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>

          </Menu>
        </Grid>
      </AppBar>
  )
}

export default TopAppBar;