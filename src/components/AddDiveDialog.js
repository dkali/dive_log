import React from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import { connect } from "react-redux";
import { addDive } from "../redux/actions";
import { Redirect } from 'react-router';
import firebase from 'firebase';
import DiveLocation from '../helpers/DiveLocation.js'

class AddDiveDialog extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      name: '',
      depth: 0,
      duration: 0,

      selected_loc_id: {},
    };

    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.changeSelectedLoc = this.changeSelectedLoc.bind(this);
  }

  handleDateChange = date => {
    // TDOD: handle users manual input, when date is invalid
    this.setState({date: firebase.firestore.Timestamp.fromDate(date)})
  }

  handleSiteChange(event) {
    this.setState({name: event.target.value})
  }

  handleDepthChange(event) {
    this.setState({depth: event.target.value})
  }

  handleDurationChange(event) {
    this.setState({duration: event.target.value})
  }

  createFireStoreEntry(state) {
    let fire_store_entry = {
      depth: Number(state.depth),
      duration: Number(state.duration),
      timestamp: state.date,
      user: firebase.auth().currentUser.uid,
      location: {
        geopoint: state.selected_loc_id.geopoint,
        loc_id: state.selected_loc_id.loc_id,
        name: state.selected_loc_id.name,
      },
    };

    return fire_store_entry;
  }

  createReduxEntry(id, state) {
    let redux_entry = new Map();
    redux_entry["dive_id"] = id;
    redux_entry["date"] = state.date;
    redux_entry["depth"] = state.depth;
    redux_entry["duration"] = state.duration;
    let location = new DiveLocation(state.selected_loc_id.name,
                                    state.selected_loc_id.loc_id,
                                    state.selected_loc_id.geopoint);
    redux_entry["location"] = location;

    return redux_entry;
  }

  handleClickSave = () => {
    var db = firebase.firestore();

    let vld = this;
    if (this.state.selected_loc_id.type === "old") {
      // reuse the existing location
      let fire_store_entry = this.createFireStoreEntry(this.state);

      // TODO reject empty input
      db.collection("dives").add(fire_store_entry)
      .then(function(docRef) {
        console.log("New Dive added with ID: ", docRef.id);

        // On success Firestore update - also update redux
        let redux_entry = this.createReduxEntry(docRef.id, this.state);
        vld.props.addDive(redux_entry);
        vld.handleClickClose();
      })
      .catch(function(error) {
        console.error("Error adding dive: ", error);
        vld.handleClickClose();
      });
    }
    else if (this.state.selected_loc_id.type === "new") {
      // we need to create a new Location in a Firestore first
      let fire_store_entry = {description: "",
                              geopoint: this.state.selected_loc_id.geopoint,
                              name: this.state.name};
      db.collection("locations").add(fire_store_entry)
      .then(function(docRef) {
        console.log("New Location created with ID: ", docRef.id);
        vld.setState({selected_loc_id: { geopoint: vld.state.selected_loc_id.geopoint,
                                         loc_id: docRef.id,
                                         name: vld.state.name,
                      }})
        // add new dive using created location
        let fire_store_entry = vld.createFireStoreEntry(vld.state);
        db.collection("dives").add(fire_store_entry)
        .then(function(docRef) {
          console.log("New Dive added with ID: ", docRef.id);
          // On success Firestore update - also update redux
          let redux_entry = vld.createReduxEntry(docRef.id, vld.state);
          vld.props.addDive(redux_entry);
          vld.handleClickClose();
        })
        .catch(function(error) {
          console.error("Error adding dive: ", error);
          vld.handleClickClose();
        });
      })
      .catch(function(error) {
        console.error("Error creating locstion: ", error);
        vld.handleClickClose();
      });
    }
  }

  handleClickClose = () => {
    this.setState({redirect: true});
  }

  // selected_marker - Map object
  changeSelectedLoc(selected_marker) {
    this.setState({selected_loc_id: {type: selected_marker.type,
                                     geopoint: selected_marker.geopoint,
                                     name: selected_marker.name,
                                     loc_id: selected_marker.loc_id},
                   name: selected_marker.name});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <EditDiveUI title = "Add new dive"
                  dive_data = {this.state}
                  handleSiteChange = {this.handleSiteChange}
                  handleDateChange = {this.handleDateChange}
                  handleDepthChange = {this.handleDepthChange}
                  handleDurationChange = {this.handleDurationChange}
                  handleClickSave = {this.handleClickSave}
                  handleClickClose = {this.handleClickClose}
                  changeSelectedLoc = {this.changeSelectedLoc}
                  />
    )
  }
}

export default connect(
  null,
  { addDive }
)(AddDiveDialog);