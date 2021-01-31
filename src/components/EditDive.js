import React, { Fragment, useState, useEffect } from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import { connect } from "react-redux";
import { getCurrentDiveData, getInitComplete} from "../redux/selectors";
import { Redirect } from 'react-router';
import firebase from 'firebase/app';
import { selectDive, selectCurrentGeopoint } from "../redux/actions";
import { firebaseUpdateDive,
  firebaseCreateLocationAndUpdateDive,
  createFireStoreDiveEntry,
  createFireStoreLocationEntry } from '../helpers/FirebaseInterface';
import { useParams } from "react-router-dom";

function EditDive(props) {
  let { firestore_id } = useParams();

  const [date, setDate] = useState(props.date);
  const [depth, setDepth] = useState(props.depth);
  const [diveID, setDiveID] = useState(props.dive_id);
  const [duration, setDuration] = useState(props.duration);
  const [location, setLocation] = useState(props.location);
  const [selectedLoc, setSelectedLoc] = useState({...location, ...{type: "old"}});
  const [redirect, setRedirect] = useState(false);
  const [diveSelectedOnReload, setDiveSelectedOnReload] = useState(false);
  
  if (diveID === undefined &&
      diveSelectedOnReload === false &&
      props.init_complete) {
    // page was reloaded, select firestore id as current dive 
    // and let Redux to reload the updated data from store
    props.selectDive(firestore_id);
    setDiveSelectedOnReload(true);
  }

  useEffect(() => {
    // init local state once we got Redux data after page reload
    if (diveID === undefined && props.init_complete) {
      setDate(props.date);
      setDepth(props.depth);
      setDiveID(props.dive_id);
      setDuration(props.duration);
      setLocation(props.location);
      setSelectedLoc({ ...location,
                       ...{type: "old"}});
    }
  });
          
  const handleDateChange = date => {
    setDate(firebase.firestore.Timestamp.fromDate(date));
  }

  const handleSiteChange = (event) => {
    setLocation({...location, ...{name: event.target.value}});
                  // () => {this.validate_input()});
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
      firebaseUpdateDive(diveID, fs_dive_data);
    }
    else if (selectedLoc.type === "new") {
      // we need to create a new Location in a Firestore first
      let fs_location_data = createFireStoreLocationEntry(selectedLoc, location);
      let fs_dive_data = createFireStoreDiveEntry(depth, duration, date, selectedLoc);
      firebaseCreateLocationAndUpdateDive(fs_location_data,
        diveID,
        fs_dive_data);
    }
    handleClickClose();
  }

  const handleClickClose = () => {
    setRedirect(true);
  }

  // selected_marker - Map object
  const changeSelectedLoc = (selected_marker) => {
    setSelectedLoc({type: selected_marker.type,
                    geopoint: selected_marker.geopoint,
                    name: selected_marker.name,
                    loc_id: selected_marker.loc_id});
    
    if (selected_marker.name === undefined) {
      setLocation( {...location, ...{name: ""}} );
    } else {
      setLocation({...location, ...{name: selected_marker.name}});
    }

    // undefined will be when unselect the New Marker
    if (selected_marker.geopoint !== undefined) {
      props.selectCurrentGeopoint(selected_marker.geopoint);
    }
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
    input_valid: inputValid,
    dive_id: diveID
  };

  if (diveID === undefined) {
    // do not render when page reloaded and we are still waiting for data from FS
    return(<Fragment />);
  }

  return (
    <EditDiveUI dive_data = {dive_data}
                handleSiteChange = {handleSiteChange}
                handleDateChange = {handleDateChange}
                handleDepthChange = {handleDepthChange}
                handleDurationChange = {handleDurationChange}
                handleClickSave = {handleClickSave}
                handleClickClose = {handleClickClose}
                changeSelectedLoc = {changeSelectedLoc}
                editMode = {true}
                />
  )
}

function mapStateToProps(state, ownProps) {
  let initial_dive_data = getCurrentDiveData(state);
  let init_complete = getInitComplete(state);

  // we have reloaded page and there is nothing in redux yet
  if (initial_dive_data === undefined) {
    initial_dive_data = {location: {}};
  }

  return { date: initial_dive_data.date,
    depth: initial_dive_data.depth,
    dive_id: initial_dive_data.dive_id,
    duration: initial_dive_data.duration,
    location: initial_dive_data.location,
    init_complete: init_complete
  };
}

export default connect(
  mapStateToProps,
  { selectDive, selectCurrentGeopoint }
)(EditDive);