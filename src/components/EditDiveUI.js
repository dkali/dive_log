/* global google */

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { NavLink } from 'react-router-dom';
import MapContainer from './MapContainer';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import firebase from 'firebase';

const flex_row_style = {
  display: "flex",
  flexDirection: "row",
  paddingTop: "1em",
}

const flex_column_style = {
  display: "flex",
  flexDirection: "column",
}

const flex_column_style2 = {
  display: "flex",
  flexDirection: "column",
  height: "300px",
}

const offset_style = {
  paddingLeft: "4em",
}

const location_style = {
  width: "60%",
  marginTop: "1em",
}

const dialog_header_style = {
  backgroundColor: "#5A6478",
  color: "white",
}

const add_dive_style = {
  marginLeft: "1em",
  marginRight: "1em",
}

class EditDiveUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new_marker: null,
    };

    this.mapClicked = this.mapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(marker){
    let selected_marker = {type: "old", 
                           name: marker.name,
                           geopoint: marker.geopoint,
                           loc_id: marker.loc_id};
    this.props.changeSelectedLoc(selected_marker);
    // TODO: change selected marker icon to be unique and remove "new" marker from map
  }

  mapClicked(mapProps, map, clickEvent) {
    var icon = {
      url: require("../icons/arrow-down-4-512.png"),
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 40)
    };

    var mark = <Marker
                title={"New Location"}
                name={"New Location"}
                key={clickEvent.latLng.lat() + clickEvent.latLng.lng()}
                position={clickEvent.latLng}
                onClick={this.onMarkerClick} 
                icon={icon}/>

    this.setState({new_marker: mark})
    let selected_marker = {type: "new", 
                           geopoint: new firebase.firestore.GeoPoint(clickEvent.latLng.lat(),
                                                                     clickEvent.latLng.lng())};
    this.props.changeSelectedLoc(selected_marker);
  }

  render() {
    return (
      <div>
        <div style={dialog_header_style}>
          <h1>{this.props.title}</h1>
        </div>

        <div style={add_dive_style}>
          <div style={flex_column_style}>
            <div style={flex_row_style}>
              <TextField
                autoFocus
                margin="dense"
                inputProps={{ 'data-testid': 'edit_dialog_site' }}
                label="Dive Site"
                fullWidth
                value={this.props.dive_data.site}
                onChange={this.props.handleSiteChange}
                />
            </div>
            <div style={flex_row_style}>
              <Input
                inputProps={{ 'data-testid': 'edit_dialog_depth' }}
                endAdornment={<InputAdornment position="end">meters</InputAdornment>}
                value={this.props.dive_data.depth}
                onChange={this.props.handleDepthChange}
              />
              <div style={offset_style}>
                <Input
                  inputProps={{ 'data-testid': 'edit_dialog_duration' }}
                  endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                  value={this.props.dive_data.duration}
                  onChange={this.props.handleDurationChange}
                />
              </div>
            </div>
            <div style={flex_row_style}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MMM dd, yyyy"
                  margin="normal"
                  inputProps={{ 'data-testid': 'edit_dialog_date-picker-inline' }}
                  label="Date picker inline"
                  value={format(fromUnixTime(this.props.dive_data.date.seconds), "MMM dd, yyyy")}
                  onChange={this.props.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div style={flex_row_style}>
              <Button onClick={this.props.handleClickClose}
                      color="primary"
                      data-testid={'edit_dialog_close'} >
                Cancel
              </Button>
              <Button onClick={this.props.handleClickSave}
                      color="primary"
                      data-testid={'edit_dialog_save'}>
                Save
              </Button>
            </div>
          </div>

          <div style={flex_column_style2}>
            <div style={flex_row_style}>
              <MapContainer
                mapClicked={this.mapClicked}
                onMarkerClick={this.onMarkerClick}
                newMarker={this.state.new_marker}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditDiveUI;