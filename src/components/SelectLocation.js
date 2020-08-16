/* global google */

import React from 'react';
import MapContainer from './MapContainer';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class SelectLocation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      new_marker: null
    };

    this.mapClicked = this.mapClicked.bind(this);
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
  }

  render() {
    return(
      <MapContainer
        mapClicked={this.mapClicked}
        newMarker={this.state.new_marker}/>
    )
  }
}

export default SelectLocation;