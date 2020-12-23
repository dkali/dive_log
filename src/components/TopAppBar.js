import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import user_icon from '../icons/user-4-128.png';
import back_icon from '../icons/arrow-98-128.png';
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
  var photoUrl;
  if (user != null) {
    photoUrl = user.photoURL;
  }
  var user_pic = photoUrl === null ? user_icon : photoUrl;

  return (
    <div>
      <AppBar position="static">
        <div style={flex_header_style}>
          <div style={left_side}>
            {(screen === 'edit' || screen === 'add') &&
              <NavLink to="/">
                <IconButton data-testid={"back_icon"} size="small">
                  <img style={header_icon_style}
                    src={back_icon}
                    alt="back" />
                </IconButton>
              </NavLink>
            }
          </div>

          {screen === 'default' &&
            <div style={header_title}>
              <h2>Welcome to Dive Log</h2>
            </div>
          }
          {screen === 'edit' &&
            <div style={header_title}>
              <h2>Edit dive</h2>
            </div>
          }
          {screen === 'add' &&
            <div style={header_title}>
              <h2>Add new dive</h2>
            </div>
          }

          <div style={right_side}>
            {screen === 'main' &&
              <IconButton data-testid={"user_icon"} size="small" onClick={clickOnProfile}>
                <img style={header_icon_style}
                  src={user_pic}
                  alt="user" />
              </IconButton>
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