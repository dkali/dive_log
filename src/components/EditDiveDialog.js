import React from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import { connect } from "react-redux";
import { editDive } from "../redux/actions";
import { getCurrentDiveData } from "../redux/selectors";
import { Redirect } from 'react-router';
import DiveLocation from '../helpers/DiveLocation.js'

import firebase from 'firebase/app';

class EditDiveDialog extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = this.props.initial_dialog_data
    this.state["selected_loc"] = this.props.initial_dialog_data.location
    this.state["selected_loc"]["type"] = "old";
    this.state["input_valid"] = true;

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
    this.setState({location: {name: event.target.value}},
                  () => {this.validate_input()});
  }

  handleDepthChange(event) {
    this.setState({depth: event.target.value},
                  () => {this.validate_input()})
  }

  handleDurationChange(event) {
    this.setState({duration: event.target.value},
                  () => {this.validate_input()})
  }

  createFireStoreEntry(state) {
    let fire_store_entry = {
      depth: Number(state.depth),
      duration: Number(state.duration),
      timestamp: state.date,
      user: firebase.auth().currentUser.uid,
      location: {
        geopoint: state.selected_loc.geopoint,
        loc_id: state.selected_loc.loc_id,
        name: state.selected_loc.name,
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
    let location = new DiveLocation(state.selected_loc.name,
                                    state.selected_loc.loc_id,
                                    state.selected_loc.geopoint);
    redux_entry["location"] = location;

    return redux_entry;
  }

  handleClickSave = () => {
    var db = firebase.firestore();

    let vld = this;
    if (this.state.selected_loc.type === "old") {
      // reuse the existing location
      let fire_store_entry = this.createFireStoreEntry(this.state);

      // TODO reject empty input
      db.collection("dives").doc(vld.state.dive_id).set(fire_store_entry)
      .then(function() {
        console.log("Dive ID ", vld.state.dive_id, " updated");

        // On success Firestore update - also update redux
        let redux_entry = vld.createReduxEntry(vld.state.dive_id, this.state);
        vld.props.editDive(vld.state.dive_id, redux_entry);
        vld.handleClickClose();
      })
      .catch(function(error) {
        console.error("Error updating dive: ", error);
        vld.handleClickClose();
      });
    }
    else if (this.state.selected_loc.type === "new") {
      // we need to create a new Location in a Firestore first
      let fire_store_entry = {description: "",
                              geopoint: this.state.selected_loc.geopoint,
                              name: this.state.location.name};
      db.collection("locations").add(fire_store_entry)
      .then(function(docRef) {
        console.log("New Location created with ID: ", docRef.id);
        vld.setState({selected_loc: { geopoint: vld.state.selected_loc.geopoint,
                                         loc_id: docRef.id,
                                         name: vld.state.location.name,
                      }})
        // add new dive using created location
        let fire_store_entry = vld.createFireStoreEntry(vld.state);
        db.collection("dives").doc(vld.state.dive_id).set(fire_store_entry)
        .then(function() {
          console.log("Dive ID ", vld.state.dive_id, " updated");
          // On success Firestore update - also update redux
          let redux_entry = vld.createReduxEntry(docRef.id, vld.state);
          vld.props.editDive(this.state.dive_id, redux_entry);
          vld.handleClickClose();
        })
        .catch(function(error) {
          console.error("Error updating dive: ", error);
          vld.handleClickClose();
        });
      })
      .catch(function(error) {
        console.error("Error creating location: ", error);
        vld.handleClickClose();
      });
    }
  }

  handleClickClose = () => {
    this.setState({redirect: true});
  }

  // selected_marker - Map object
  changeSelectedLoc(selected_marker) {
    let updated_chunk = {selected_loc: {type: selected_marker.type,
                                        geopoint: selected_marker.geopoint,
                                        name: selected_marker.name,
                                        loc_id: selected_marker.loc_id}}
    
    updated_chunk.location = selected_marker.name === undefined ? {name: ""} : {name: selected_marker.name};
    this.setState(updated_chunk, () => {this.validate_input()});
  }

  validate_input() {
    let regex = /^\d+$/; // Any digit
    let valid = (this.state.location.name === "" ||
                 Object.keys(this.state.selected_loc).length === 0 ||
                 regex.test(this.state.depth) === false ||
                 this.state.depth === 0 ||
                 regex.test(this.state.duration) === false ||
                 this.state.duration === 0) ? false : true;
    this.setState({input_valid: valid});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <EditDiveUI dive_data = {this.state}
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

function mapStateToProps(state, ownProps) {
  const initial_dialog_data = getCurrentDiveData(state);
  return { initial_dialog_data }
}

export default connect(
  mapStateToProps,
  { editDive }
)(EditDiveDialog);