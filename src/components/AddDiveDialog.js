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
      site: '',
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
    this.setState({site: event.target.value})
  }

  handleDepthChange(event) {
    this.setState({depth: event.target.value})
  }

  handleDurationChange(event) {
    this.setState({duration: event.target.value})
  }

  handleClickSave = () => {
    var db = firebase.firestore();

    if (this.state.selected_loc_id.type === "old") {
      // reuse the existing location
      let fire_store_entry = {
        depth: this.state.depth,
        duration: this.state.duration,
        timestamp: this.state.date,
        user: firebase.auth().currentUser.uid,
        location: {
          geopoint: this.state.selected_loc_id.geopoint,
          locid: this.state.selected_loc_id.loc_id,
          name: this.state.selected_loc_id.name,
        },
      };

      let vld = this;
      // TODO reject empty input
      db.collection("dives").add(fire_store_entry)
      .then(function(docRef) {
        console.log("New Dive added with ID: ", docRef.id);

        let redux_entry = new Map();
        redux_entry["dive_id"] = docRef.id;
        redux_entry["date"] = this.state.date;
        redux_entry["depth"] = this.state.depth;
        redux_entry["duration"] = this.state.duration;
        let location = new DiveLocation(this.state.selected_loc_id.name,
                                        this.state.selected_loc_id.loc_id,
                                        this.state.selected_loc_id.geopoint);
        redux_entry["location"] = location;

        vld.props.addDive(redux_entry);
        vld.handleClickClose();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        vld.handleClickClose();
      });
    }
    else if (this.state.new_geopoint) {
      // we need to create a new Location in a Firestore first

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
                                     loc_id: selected_marker.loc_id}});
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