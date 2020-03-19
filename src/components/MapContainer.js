import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
var constants = require('../ApiKey.js'); 

const map_style = {
  width: '90%',
  height: '85%',
}

export class MapContainer extends React.Component {
  render() {
    const { diveData } = this.props;

    const listItems = this.props.diveData.map((dive) => <Marker
      title={dive.site}
      name={dive.site}
      key={dive.lat + dive.lon}
      position={{lat: dive.lat, lng: dive.lon}}
      onClick={this.onMarkerClick} />);

    return (
      <Map google={this.props.google} zoom={8} style={map_style}
            initialCenter={{
              lat: 56.329913,
              lng: 43.990241
            }}
            >
 
        {listItems}
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (constants.GOOGLE_API_KEY)
})(MapContainer)