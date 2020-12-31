import React from 'react';

import DiveList from './DiveList.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { connect } from "react-redux";
import { initStore } from "../redux/actions";
import DiveLocation from '../helpers/DiveLocation.js'


class DiveLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dive_info_opened: false,
    };
  }

  componentDidMount() {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    if (user != null) {
      console.log("initializing store for user id " + user.uid);
      var divesRef = db.collection("dives");
      var query = divesRef.where("user", "==", user.uid).orderBy("timestamp", "desc");
      var vld = this;
      query.get()
        .then(function (querySnapshot) {
          let dive_list_init = [];
          querySnapshot.forEach(function (doc) {
            let dive_data = new Map();
            dive_data["dive_id"] = doc.id;
            dive_data["date"] = doc.data().timestamp;
            dive_data["depth"] = doc.data().depth;
            dive_data["duration"] = doc.data().duration;
            let location = new DiveLocation(doc.data().location.name,
              doc.data().location.loc_id,
              doc.data().location.geopoint);
            dive_data["location"] = location;

            dive_list_init.push(dive_data);
            // location: new firebase.firestore.GeoPoint(latitude, longitude)
          });

          // save data to redux
          vld.props.initStore(dive_list_init);
        })
        .catch(function (error) {
          console.log("Error getting dives: ", error);
        });
    }
  }

  handleEntryClick = () => {
    this.setState({ dive_info_opened: true })
  }

  handleClickCloseDialog = () => {
    this.setState({ dive_info_opened: false })
  }

  render() {
    const dive_log_style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "8px",
      position: "relative",
    }

    return (
      <div data-testid={'dive_log'}>
        <div style={dive_log_style}>
          <DiveList handleEntryClick={this.handleEntryClick} />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { initStore }
)(DiveLog);