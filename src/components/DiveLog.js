import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DiveInfoDialog from './DiveInfoDialog.js';
import DeleteConfirmationDialog from './DeleteConfirmationDialog.js'
import DiveList from './DiveList.js';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import { Redirect } from 'react-router';
import { Button } from '@material-ui/core';
import { connect } from "react-redux";
import { initStore } from "../redux/actions";
import DiveLocation from '../helpers/DiveLocation.js'

class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dive_info_opened: false,
      del_confirmation_opened: false,
      sign_out: false,
    };
  }

  componentDidMount(){
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    if (user != null) {
      console.log("initializing store for user id " + user.uid);
      var divesRef = db.collection("dives");
      var query = divesRef.where("user", "==", user.uid).orderBy("timestamp", "asc");
      var vld = this;
      query.get()
      .then(function(querySnapshot) {
        let dive_list_init = [];
        querySnapshot.forEach(function(doc) {
          let dive_data = new Map();
          dive_data["dive_id"] = doc.id;
          dive_data["date"] = doc.data().timestamp;
          dive_data["depth"] = doc.data().depth;
          dive_data["duration"] = doc.data().duration;
          let location = new DiveLocation(doc.data().location.name,
                                          doc.data().location.locid,
                                          doc.data().location.geopoint);
          dive_data["location"] = location;
          
          dive_list_init.push(dive_data);
          // location: new firebase.firestore.GeoPoint(latitude, longitude)
        });

        // save data to redux
        // TODO: why "this" is undefined in callbacks?
        vld.props.initStore(dive_list_init);
      })
      .catch(function(error) {
          console.log("Error getting dives: ", error);
      });
    }
  }

  handleEntryClick = () => {
    this.setState({dive_info_opened: true})
  }

  handleDeleteClick = () => {
    this.setState({del_confirmation_opened: true})
  }

  handleClickCloseDialog = () => {
    this.setState({dive_info_opened: false,
                   del_confirmation_opened: false})
  }

  handleClickCloseDelConfirmationDialog = () => {
    this.setState({del_confirmation_opened: false})
  }

  render() {
    const add_dive_style = {
      position: "fixed",
      bottom: "2em",
      right: "2em",
    }

    const dive_log_style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-around",
    }

    if (this.state.sign_out) {
      console.log("Divelog: signed out, redirect to /")
      return <Redirect push to='/' />;
    }

    return (
      <div data-testid={'dive_log'}>
        <div style={dive_log_style}>
          <DiveList handleEntryClick={this.handleEntryClick}/>
          <NavLink to="/add_dive">
            <Fab style={add_dive_style}
                color="primary"
                data-testid={'add_new_dive_btn'}>
              <AddIcon />
            </Fab>
          </NavLink>
        </div>
        <DiveInfoDialog data-testid={'dive_info_dialog'}
                        opened={this.state.dive_info_opened}
                        handleClickClose={this.handleClickCloseDialog}
                        handleTabChange={this.props.handleTabChange}
                        handleDeleteClick={this.handleDeleteClick} />
        <DeleteConfirmationDialog data-testid={'delete_confirmation'}
                        opened={this.state.del_confirmation_opened}
                        handleClickCloseDelConfirmationDialog={this.handleClickCloseDelConfirmationDialog}
                        handleClickCloseDialog={this.handleClickCloseDialog} />
        <Button onClick={() => {
          firebase.auth().signOut();
          this.setState({sign_out: true});
        }}>Sign out</Button>
      </div>
    )
  }
}

export default connect(
  null,
  { initStore }
)(DiveLog);