import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from "react-redux";
import { getDiveList, getCurGeopoint } from "../redux/selectors";

var constants = require('../ApiKey.js');

const containerStyle = {
  position: 'relative',  
  width: '100%',
  height: '100%',
}

function MapContainer(props) {
  const createMarker = (location) => {
    return (<Marker
      title={location.name}
      name={location.name}
      key={location.geopoint.latitude + location.geopoint.longitude}
      position={{ lat: location.geopoint.latitude, lng: location.geopoint.longitude }}
      onClick={props.onMarkerClick}
      // custom fields
      loc_id={location.loc_id}
      geopoint={location.geopoint}
    />)
  }

  const { dives, curGeoPoint } = props;

  // filter for only unique locations
  let uniq_locations = new Set();
  let listItems = [];
  dives.forEach(dive => {
    if (uniq_locations.has(dive.location.name) === false) {
      uniq_locations.add(dive.location.name);
      listItems.push(createMarker(dive.location));
    }
  });

  return (
    <Map google={props.google}
      zoom={9}
      style={props.map_style}
      initialCenter={{
        lat: curGeoPoint.latitude,
        lng: curGeoPoint.longitude
      }}
      center={{
        lat: curGeoPoint.latitude,
        lng: curGeoPoint.longitude
      }}
      containerStyle={containerStyle}
      onClick={props.mapClicked}
    >

      {listItems}
      {props.newMarker != null && props.newMarker}
    </Map>
  );
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  const curGeoPoint = getCurGeopoint(state);
  return { dives, curGeoPoint };
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (constants.GOOGLE_API_KEY)
})(MapContainer));