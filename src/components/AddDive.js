import React, { useState } from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import { Redirect } from 'react-router';
import firebase from 'firebase/app';
import { firebaseAddDive,
  firebaseCreateLocAndAddDive,
  createFireStoreDiveEntry,
  createFireStoreLocationEntry } from '../helpers/FirebaseInterface'

function AddDive() {
  const [date, setDate] = useState(firebase.firestore.Timestamp.fromDate(new Date()));
  const [depth, setDepth] = useState(0);
  const [duration, setDuration] = useState(0);
  const [location, setLocation] = useState({ name: '' });
  const [selectedLoc, setSelectedLoc] = useState({});
  const [redirect, setRedirect] = useState(false);

  const handleDateChange = date => {
    setDate(firebase.firestore.Timestamp.fromDate(date));
  }

  const handleSiteChange = (event) => {
    setLocation({ name: event.target.value });
  }

  const handleDepthChange = (event) => {
    setDepth(event.target.value);
  }

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  }

  const handleClickSave = () => {
    if (selectedLoc.type === "old") {
      // reuse the existing location
      let fs_dive_data = createFireStoreDiveEntry(depth, duration, date, selectedLoc);
      firebaseAddDive(fs_dive_data);
    }
    else if (selectedLoc.type === "new") {
      // we need to create a new Location in a Firestore first
      let fs_location_data = createFireStoreLocationEntry(selectedLoc, location);
      let fs_dive_data = createFireStoreDiveEntry(depth, duration, date, selectedLoc);
      firebaseCreateLocAndAddDive(fs_location_data, fs_dive_data);
    }
    handleClickClose();
  }

  const handleClickClose = () => {
    setRedirect(true);
  }

  // selected_marker - Map object
  const changeSelectedLoc = (selected_marker) => {
    let selected_loc = {
      type: selected_marker.type,
      geopoint: selected_marker.geopoint,
      name: selected_marker.name,
      loc_id: selected_marker.loc_id
    }

    let location = selected_marker.name === undefined ?
      { name: "" } :
      { name: selected_marker.name };
    setLocation(location);
    setSelectedLoc(selected_loc);
  }

  let inputValid = (location.name === "" ||
                    depth <= 0 ||
                    duration <= 0) ? false : true;

  if (redirect) {
    return <Redirect push to="/" />;
  }

  let dive_data = {
    selected_loc: selectedLoc,
    location: location,
    depth: depth,
    duration: duration,
    date: date,
    input_valid: inputValid
  };

  return (
    <EditDiveUI dive_data={dive_data}
      handleSiteChange={handleSiteChange}
      handleDateChange={handleDateChange}
      handleDepthChange={handleDepthChange}
      handleDurationChange={handleDurationChange}
      handleClickSave={handleClickSave}
      handleClickClose={handleClickClose}
      changeSelectedLoc={changeSelectedLoc}
    />
  )
}

export default AddDive;