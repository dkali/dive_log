/* global google */

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MapContainer from './MapContainer';
import { Marker } from 'google-maps-react';
import firebase from 'firebase/app';
import arrow_icon from '../icons/arrow-down-4-512.png';
import Grid from '@material-ui/core/Grid';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { Redirect } from 'react-router';

function EditDiveUI(props) {
  const [new_marker, set_new_marker] = useState(null);
  const [deleteConfOpen, setDeleteConfOpen] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  const onMarkerClick = marker => {
    let selected_marker = {
      type: "old",
      name: marker.name,
      geopoint: marker.geopoint,
      loc_id: marker.loc_id
    };
    set_new_marker(null);
    props.changeSelectedLoc(selected_marker);
  }

  const mapClicked = (mapProps, map, clickEvent) => {
    var icon = {
      url: arrow_icon,
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 40)
    };

    var mark = <Marker
      title={"New Location"}
      name={""}
      key={clickEvent.latLng.lat() + clickEvent.latLng.lng()}
      position={clickEvent.latLng}
      onClick={onMarkerClick}
      icon={icon} />;

    set_new_marker(mark);
    let selected_marker = {
      type: "new",
      geopoint: new firebase.firestore.GeoPoint(clickEvent.latLng.lat(),
        clickEvent.latLng.lng())
    };
    props.changeSelectedLoc(selected_marker);
  }

  const openConfirmation = () => {
    setDeleteConfOpen(true)
  }

  const closeConfirmation = () => {
    setDeleteConfOpen(false)
  }

  const confirmDeletion = () => {
    setDeletionConfirmed(true);
  }

  if (deletionConfirmed) {
    return <Redirect push to="/" />;
  }

  return (
    <div style={{ padding: 20 }}>
    <Grid container direction="column" spacing={2}>
      <Grid item xs={"auto"}>
        {props.dive_data.selected_loc.type === "old" &&
          <TextField
            autoFocus
            disabled
            margin="dense"
            inputProps={{ 'data-testid': 'edit_dialog_site' }}
            label="Dive Site"
            fullWidth
            value={props.dive_data.location.name}
          />}

        {(props.dive_data.selected_loc.type === "new" ||
          Object.keys(props.dive_data.selected_loc).length === 0) &&
          <TextField
            autoFocus
            margin="dense"
            inputProps={{ 'data-testid': 'edit_dialog_site' }}
            label="Dive Site"
            fullWidth
            value={props.dive_data.location.name}
            onChange={props.handleSiteChange}
            />}
      </Grid>

      <Grid item xs={"auto"}>
        <Input
          inputProps={{ 'data-testid': 'edit_dialog_depth' }}
          endAdornment={<InputAdornment position="end">meters</InputAdornment>}
          value={props.dive_data.depth}
          onChange={props.handleDepthChange}
          color='primary'
          type='number'
        />
      </Grid>

      <Grid item xs={"auto"}>
        <Input
          inputProps={{ 'data-testid': 'edit_dialog_duration' }}
          endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
          value={props.dive_data.duration}
          onChange={props.handleDurationChange}
          color='primary'
          type='number'
        />
      </Grid>

      <Grid item xs={"auto"}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            format="MM/dd/yyyy"
            margin="normal"
            inputProps={{ 'data-testid': 'edit_dialog_date-picker-inline' }}
            label="Date picker inline"
            value={props.dive_data.date}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={"auto"}>
        <Button onClick={props.handleClickClose}
          color="primary"
          data-testid={'edit_dialog_close'} >
          Cancel
        </Button>
        {props.dive_data.input_valid === false && <Button disabled
          color="primary"
          data-testid={'edit_dialog_save'}>
          Save
        </Button>}
        {props.dive_data.input_valid === true && <Button onClick={props.handleClickSave}
          color="primary"
          data-testid={'edit_dialog_save'}>
          Save
        </Button>}
        {props.editMode === true && <Button onClick={openConfirmation}
          color="secondary"
          data-testid={'edit_dialog_save'}>
          Delete
        </Button>}
      </Grid>

      <Grid item xs={"auto"}>
        <MapContainer
          map_style={{
            height: '50vh',
            width: "90vw"
          }}
          mapClicked={mapClicked}
          onMarkerClick={onMarkerClick}
          newMarker={new_marker} />
      </Grid>
      
    </Grid>

    <DeleteConfirmationDialog
      opened={deleteConfOpen}
      dive_id={props.dive_data.dive_id}
      handleClickClose={closeConfirmation}
      confirmDeletion={confirmDeletion}/>
    
    </div>
  )
}

export default EditDiveUI;