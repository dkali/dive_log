import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { getDiveList, getCurrentDiveData } from "../redux/selectors";
var constants = require('../ApiKey.js'); 

const map_style = {
  width: '100%',
  height: '45%',
}

export class MapContainer extends React.Component {
  createMarker(location) {
    return (<Marker
      title={location.name}
      name={location.name}
      key={location.geopoint.latitude + location.geopoint.longitude}
      position={{lat: location.geopoint.latitude, lng: location.geopoint.longitude}}
      onClick={this.props.onMarkerClick}
      // custom fields
      loc_id={location.loc_id}
      geopoint={location.geopoint}
      />)
  }

  render() {
    const { dives, cur_dive } = this.props;

    // filter for only unique locations
    let uniq_locations = new Set();
    let listItems = [];
    dives.forEach(dive => {
      if (uniq_locations.has(dive.location.name) === false) {
        uniq_locations.add(dive.location.name);
        listItems.push(this.createMarker(dive.location));
      }
    });

    // center map on selected dive, or a last known dive, if nothing selected
    var center_lat = 56.336893;
    var center_lon = 43.986196;
    if (dives.length > 0) {
      center_lat = cur_dive === undefined ? dives[dives.length-1].location.geopoint.latitude : cur_dive.location.geopoint.latitude;
      center_lon = cur_dive === undefined ? dives[dives.length-1].location.geopoint.longitude : cur_dive.location.geopoint.longitude;
    }

    return (
      <Map google={this.props.google} zoom={8} style={map_style}
            initialCenter={{
              lat: center_lat,
              lng: center_lon
            }}
            onClick={this.props.mapClicked}
            >
 
        {listItems}
        {this.props.newMarker != null && this.props.newMarker}
      </Map>
    );
  }
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  const cur_dive = getCurrentDiveData(state);
  return { dives, cur_dive };
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (constants.GOOGLE_API_KEY)
})(MapContainer));