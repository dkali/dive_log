import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { initFirebase, getAuthState } from '../helpers/FirebaseInterface';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

function TopAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [photoLoadFailed, setPhotoLoadFailed] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleMenuClose();
    try {
      await signOut(getAuthState());
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  // Initialize Firebase and set up auth state listener
  useEffect(() => {
    initFirebase();
    
    const unsubscribe = onAuthStateChanged(getAuthState(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPhotoLoadFailed(false);
  }, [user?.photoURL]);

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

  const getLeftIcon = () => screen === 'edit' || screen === 'add' ?
    <NavLink to="/">
      <IconButton aria-label="Back to dive log">
        <ArrowBackIcon />
      </IconButton>
    </NavLink> :
    <IconButton aria-label="Settings">
      <SettingsIcon />
    </IconButton>

  const getProfileIcon = () => {
    if (user !== null) {
      if (user.photoURL && !photoLoadFailed) {
        return <img
          src={user.photoURL}
          alt="user"
          style={{ width: 40, height: 40, objectFit: 'cover' }}
          onError={() => setPhotoLoadFailed(true)}
        />;
      }
      else {
        return <PersonIcon fontSize="large" />;
      }
    }
  }

  return (
    <AppBar color="primary" position="static">
      <Toolbar sx={{ minHeight: 64 }}>
        <div style={{ width: 48, display: 'flex', justifyContent: 'flex-start' }}>
          {getLeftIcon()}
        </div>

        <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
          {title}
        </Typography>

        <div style={{ width: 48, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            aria-label={user?.displayName ? `Signed in as ${user.displayName}` : 'User profile'}
            aria-controls={menuOpen ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleProfileClick}
          >
            {getProfileIcon()}
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            {user?.email && (
              <MenuItem disabled>{user.email}</MenuItem>
            )}
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar;