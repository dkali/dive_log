import React from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import { Redirect } from 'react-router';
import firebase from 'firebase/app';
import { firebaseAddDive,
  firebaseCreateLocAndAddDive,
  createFireStoreDiveEntry,
  createFireStoreLocationEntry } from '../helpers/FirebaseInterface'

class AddDive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      location: { name: '' },
      depth: 0,
      duration: 0,

      selected_loc: {},
      input_valid: false,
    };

    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.changeSelectedLoc = this.changeSelectedLoc.bind(this);
  }

  handleDateChange = date => {
    // TDOD: handle users manual input, when date is invalid
    this.setState({ date: firebase.firestore.Timestamp.fromDate(date) })
  }

  handleSiteChange(event) {
    this.setState({ location: { name: event.target.value } },
      () => { this.validate_input() });
  }

  handleDepthChange(event) {
    this.setState({ depth: event.target.value },
      () => { this.validate_input() })
  }

  handleDurationChange(event) {
    this.setState({ duration: event.target.value },
      () => { this.validate_input() })
  }

  handleClickSave = () => {
    if (this.state.selected_loc.type === "old") {
      // reuse the existing location
      let fs_dive_data = createFireStoreDiveEntry(this.state);
      firebaseAddDive(fs_dive_data);
    }
    else if (this.state.selected_loc.type === "new") {
      // we need to create a new Location in a Firestore first
      let fs_location_data = createFireStoreLocationEntry(this.state);
      let fs_dive_data = createFireStoreDiveEntry(this.state);
      firebaseCreateLocAndAddDive(fs_location_data, fs_dive_data);
    }
    this.handleClickClose();
  }

  handleClickClose = () => {
    this.setState({ redirect: true });
  }

  // selected_marker - Map object
  changeSelectedLoc(selected_marker) {
    let updated_chunk = {
      selected_loc: {
        type: selected_marker.type,
        geopoint: selected_marker.geopoint,
        name: selected_marker.name,
        loc_id: selected_marker.loc_id
      }
    }

    updated_chunk.location = selected_marker.name === undefined ? { name: "" } : { name: selected_marker.name };
    this.setState(updated_chunk, () => { this.validate_input() });
  }

  validate_input() {
    let regex = /^\d+$/;
    let valid = (this.state.location.name === "" ||
      Object.keys(this.state.selected_loc).length === 0 ||
      regex.test(this.state.depth) === false ||
      this.state.depth === 0 ||
      regex.test(this.state.duration) === false ||
      this.state.duration === 0) ? false : true;
    this.setState({ input_valid: valid });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <EditDiveUI dive_data={this.state}
        handleSiteChange={this.handleSiteChange}
        handleDateChange={this.handleDateChange}
        handleDepthChange={this.handleDepthChange}
        handleDurationChange={this.handleDurationChange}
        handleClickSave={this.handleClickSave}
        handleClickClose={this.handleClickClose}
        changeSelectedLoc={this.changeSelectedLoc}
      />
    )
  }
}

export default AddDive;