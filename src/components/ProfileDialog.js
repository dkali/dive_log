import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import logout_icon from '../icons/account-logout-128.png';
import firebase from 'firebase/app';
import 'firebase/firestore';

const flex_header_style = {
  display: "flex",
  flexDirection: "row",
}
const header_icon_style = {
  height: "2em",
  width: "2em",
  display: "block",
}
const jend = {
  display: "flex",
  flexDirection: "row",
  marginRight: "0px",
  marginLeft: "auto",
}
const dialog_header_style = {
  backgroundColor: "#5A6478",
  color: "white",
}
const dialog_body_style = {
  backgroundColor: "#495361",
  color: "white",
}

function ProfileDialog(props) {
  let user = firebase.auth().currentUser;
  var name, email;
  if (user != null) {
    name = user.displayName;
    email = user.email;
  }

  return (
    <div>
      {props.open &&
        <Dialog open={props.open} onClose={props.onClose}>
          <DialogTitle id="form-dialog-title" style={dialog_header_style}>
            <div style={flex_header_style}>
              User Profile
              <div style={jend}>
                <NavLink to="/login">
                  <IconButton data-testid={"logout_icon"} size="small"
                    onClick={() => {
                      firebase.auth().signOut();
                      props.onClose();
                    }}>
                    <img style={header_icon_style}
                      src={logout_icon}
                      alt="logout" />
                  </IconButton>
                </NavLink>
              </div>
            </div>
          </DialogTitle>
          <DialogContent style={dialog_body_style}>
            {name && <div>user name: {name}</div>}
            <div>user email: {email}</div>
          </DialogContent>
        </Dialog>
      }
    </div>
  )
}

export default ProfileDialog;