import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import ProfileDialog from './ProfileDialog.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
require('firebase/auth')

const flex_header_style = {
  display: "flex",
  flexDirection: "row",
}

const header_icon_style = {
  height: "2em",
  width: "2em",
}

const left_side = {
  display: "flex",
  flexDirection: "row",
  marginRight: "auto",
  marginTop: "auto",
  marginBottom: "auto",
  marginLeft: "24px",
}

const right_side = {
  display: "flex",
  flexDirection: "row",
  marginRight: "24px",
  marginTop: "4px",
  marginBottom: "4px",
  marginLeft: "auto",
}

const header_title = {
  marginTop: "auto",
  marginBottom: "auto",
}

function TopAppBar() {
  let location = useLocation();
  let screen = 'default';
  if (location.pathname === '/') {
    screen = 'main';
  }
  if (location.pathname === '/edit_dive') {
    screen = 'edit';
  }
  if (location.pathname === '/add_dive') {
    screen = 'add';
  }

  let [profileOpen, setProfileOpen] = useState(false);
  const handleClose = () => {
    setProfileOpen(false);
  }
  const clickOnProfile = () => {
    setProfileOpen(true);
  }

  let user = firebase.auth().currentUser;

  return (
    <div>
      <AppBar position="static">
        <div style={flex_header_style}>
          <div style={left_side}>
            {(screen === 'edit' || screen === 'add') &&
              <NavLink to="/">
                <ArrowBackIcon fonrSize="large" />
              </NavLink>
            }
          </div>

          {screen === 'default' &&
            <div style={header_title}>
              <h3>Welcome to Dive Log</h3>
            </div>
          }
          {screen === 'edit' &&
            <div style={header_title}>
              <p>Edit dive</p>
            </div>
          }
          {screen === 'add' &&
            <div style={header_title}>
              <p>Add new dive</p>
            </div>
          }

          <div style={right_side}>
            {screen === 'main' && user !== null && user.photoURL !== null &&
              <IconButton data-testid={"user_icon"} size="small" onClick={clickOnProfile}>
                <img style={header_icon_style}
                  src={user.photoURL}
                  alt="user" />
              </IconButton>
            }
            {screen === 'main' && user !== null && user.photoURL === null &&
              <PersonIcon onClick={clickOnProfile}
                fontSize="large" />
            }
          </div>
        </div>
      </AppBar>
      <ProfileDialog open={profileOpen}
        onClose={handleClose} />
    </div>
  )
}

export default TopAppBar;