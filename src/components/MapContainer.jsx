import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from '../ApiKey.js';
import { connect } from "react-redux";
import { getDiveList, getCurGeopoint } from "../redux/selectors";

const containerStyle = {
  position: 'relative',  
  width: '100%',
  height: '100%',
}

function MapContainer(props) {
  const { dives, curGeoPoint } = props;
  
  // filter for only unique locations
  let uniq_locations = new Set();
  let listItems = [];
  dives.forEach(dive => {
    if (uniq_locations.has(dive.location.name) === false) {
      uniq_locations.add(dive.location.name);
      listItems.push(
        <Marker
          title={dive.location.name}
          name={dive.location.name}
          key={dive.location.geopoint.latitude + dive.location.geopoint.longitude}
          position={{ lat: dive.location.geopoint.latitude, lng: dive.location.geopoint.longitude }}
          onClick={props.onMarkerClick}
          // custom fields
          loc_id={dive.location.loc_id}
          geopoint={dive.location.geopoint}
        />
      );
    }
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY
  })

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={props.map_style}
      center={{
        lat: curGeoPoint.latitude,
        lng: curGeoPoint.longitude
      }}
      zoom={9}
      onClick={props.mapClicked}
    >
      {listItems}
      {props.newMarker != null && props.newMarker}
    </GoogleMap>
  );
}

const mapStateToProps = state => {
  const dives = getDiveList(state);
  const curGeoPoint = getCurGeopoint(state);
  return { dives, curGeoPoint };
}

export default connect(mapStateToProps)(MapContainer);