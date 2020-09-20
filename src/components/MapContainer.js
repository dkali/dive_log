import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { getDiveList, getCurrentDiveData } from "../redux/selectors";
var constants = require('../ApiKey.js'); 

const map_style = {
  width: '100%',
  height: '45%',
}

export class MapContainer extends React.Component {
  render() {
    const { dives, cur_duve } = this.props;

    const listItems = dives.map((dive) => <Marker
      title={dive.location.site}
      name={dive.location.site}
      loc_id={dive.location.loc_id}
      geopoint={dive.location.geopoint}
      key={dive.location.geopoint.latitude + dive.location.geopoint.longitude}
      position={{lat: dive.location.geopoint.latitude, lng: dive.location.geopoint.longitude}}
      onClick={this.props.onMarkerClick} />);

    // center map on selected dive, or a last known dive, if nothing selected
    var center_lat = cur_duve === undefined ? dives[0].location.geopoint.latitude : cur_duve.location.geopoint.latitude;
    var center_lon = cur_duve === undefined ? dives[0].location.geopoint.longitude : cur_duve.location.geopoint.longitude;

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
  const cur_duve = getCurrentDiveData(state);
  return { dives, cur_duve };
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (constants.GOOGLE_API_KEY)
})(MapContainer));