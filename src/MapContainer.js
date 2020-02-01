import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
const GOOGLE_API_KEY = "AIzaSyB9HfW0-SV3_2FRDB2m_aAFUnxlbrd7vVQ";
 
const map_style = {
  width: '90%',
  height: '85%',
}

const DiveMarkers = props => {
  let entries = []
  entries.push(<Marker
                  key={1}
                  title={'ZKPD 4'}
                  name={'ZKPD 4'}
                  position={{lat: 56.369396, lng: 43.772421}} />)
  entries.push(<Marker
                  key={2}
                  title={'Volga'}
                  name={'Volga'}
                  position={{lat: 56.348944, lng: 43.972291}} />)

  // for (let index = props.diveData.length - 1; index >= 0; index--) {
  //   let entry = props.diveData[index];
  //   entry["dive_num"] = index;
  //   entries.push(<Marker entryData={entry}
  //                        key={index}
  //                        title={entry["site"]}
  //                        name={entry["name"]}
  //                        position={{lat: entry["lat"], lng: entry["lon"]}}
  //                       //  handleEntryClick={props.handleEntryClick}
  //                 />)
  // }

  // return entries;

  return <Marker
    title={'ZKPD 4'}
    name={'ZKPD 4'}
    position={{lat: 56.369396, lng: 43.772421}} />
}

export class MapContainer extends React.Component {
  render() {
    const { diveData } = this.props;

    return (
      <Map google={this.props.google} zoom={11} style={map_style}
            initialCenter={{
              lat: 56.329913,
              lng: 43.990241
            }}
            >
 
        <DiveMarkers diveData={diveData}/>

        {/* <Marker
          title={'ZKPD 4'}
          name={'ZKPD 4'}
          position={{lat: 56.369396, lng: 43.772421}}
          onClick={this.onMarkerClick} />
        <Marker
          title={'Volga'}
          name={'Volga'}
          position={{lat: 56.348944, lng: 43.972291}} /> */}

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer)