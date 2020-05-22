import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { getDiveList, getCurrentDiveData } from "../redux/selectors";
var constants = require('../ApiKey.js'); 

const map_style = {
  width: '90%',
  height: '85%',
}

export class MapContainer extends React.Component {
  render() {
    const { dives, cur_duve } = this.props;

    const listItems = dives.map((dive) => <Marker
      title={dive.site}
      name={dive.site}
      key={dive.lat + dive.lon}
      position={{lat: dive.lat, lng: dive.lon}}
      onClick={this.onMarkerClick} />);

    // center map on selected dive, or a last known dive, if nothing selected
    var center_lat = cur_duve === undefined ? dives[0].lat : cur_duve.lat;
    var center_lon = cur_duve === undefined ? dives[0].lon : cur_duve.lon;

    return (
      <Map google={this.props.google} zoom={8} style={map_style}
            initialCenter={{
              lat: center_lat,
              lng: center_lon
            }}
            >
 
        {listItems}
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