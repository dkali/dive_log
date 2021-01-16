import React, { Fragment } from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import { connect } from "react-redux";
import { getCurrentDiveData} from "../redux/selectors";
import { Redirect } from 'react-router';
import { withRouter } from "react-router";
import firebase from 'firebase/app';
import { selectDive } from "../redux/actions";

class EditDive extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};

    if (this.props.initial_dialog_data.location !== undefined) {
      // we have location data from redux already
      this.state = this.props.initial_dialog_data;
      this.state["firestore_id"] = this.props.match.params.firestore_id;
      this.state["selected_loc"] = this.props.initial_dialog_data.location;
      this.state["selected_loc"]["type"] = "old";
      this.state["input_valid"] = true;
    } else {
      // page was reloaded, select firestore id as current dive 
      // and let Redux to reload the updated data from store
      this.props.selectDive(this.props.match.params.firestore_id);
    }

    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.changeSelectedLoc = this.changeSelectedLoc.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // init local state once we got Redux data after page reload
    if (this.state["selected_loc"] === undefined &&
    Object.keys(this.props.initial_dialog_data).length !== 0) {
      this.setState({
        ...this.props.initial_dialog_data,
        ...{firestore_id: this.props.match.params.firestore_id,
          selected_loc: { ...this.props.initial_dialog_data.location,
                          ...{type: "old"}},
          input_valid: true}});
    }
  }

  handleDateChange = date => {
    // TDOD: handle users manual input, when date is invalid
    this.setState({date: firebase.firestore.Timestamp.fromDate(date)})
  }

  handleSiteChange(event) {
    this.setState({location: {name: event.target.value}},
                  () => {this.validate_input()});
  }

  handleDepthChange(event) {
    this.setState({depth: event.target.value},
                  () => {this.validate_input()})
  }

  handleDurationChange(event) {
    this.setState({duration: event.target.value},
                  () => {this.validate_input()})
  }

  createFireStoreEntry(state) {
    let fire_store_entry = {
      depth: Number(state.depth),
      duration: Number(state.duration),
      timestamp: state.date,
      user: firebase.auth().currentUser.uid,
      location: {
        geopoint: state.selected_loc.geopoint,
        loc_id: state.selected_loc.loc_id,
        name: state.selected_loc.name,
      },
    };

    return fire_store_entry;
  }

  handleClickSave = () => {
    var db = firebase.firestore();

    let vld = this;
    if (this.state.selected_loc.type === "old") {
      // reuse the existing location
      let fire_store_entry = this.createFireStoreEntry(this.state);

      // TODO reject empty input
      db.collection("dives").doc(vld.state.dive_id).set(fire_store_entry)
      .then(function() {
        console.log("Dive ID ", vld.state.dive_id, " updated");
        vld.handleClickClose();
      })
      .catch(function(error) {
        console.error("Error updating dive: ", error);
        vld.handleClickClose();
      });
    }
    else if (this.state.selected_loc.type === "new") {
      // we need to create a new Location in a Firestore first
      let fire_store_entry = {description: "",
                              geopoint: this.state.selected_loc.geopoint,
                              name: this.state.location.name};
      db.collection("locations").add(fire_store_entry)
      .then(function(docRef) {
        console.log("New Location created with ID: ", docRef.id);
        vld.setState({selected_loc: { geopoint: vld.state.selected_loc.geopoint,
                                         loc_id: docRef.id,
                                         name: vld.state.location.name,
                      }})
        // add new dive using created location
        let fire_store_entry = vld.createFireStoreEntry(vld.state);
        db.collection("dives").doc(vld.state.dive_id).set(fire_store_entry)
        .then(function() {
          console.log("Dive ID ", vld.state.dive_id, " updated");
          vld.handleClickClose();
        })
        .catch(function(error) {
          console.error("Error updating dive: ", error);
          vld.handleClickClose();
        });
      })
      .catch(function(error) {
        console.error("Error creating location: ", error);
        vld.handleClickClose();
      });
    }
  }

  handleClickClose = () => {
    this.setState({redirect: true});
  }

  // selected_marker - Map object
  changeSelectedLoc(selected_marker) {
    let updated_chunk = {selected_loc: {type: selected_marker.type,
                                        geopoint: selected_marker.geopoint,
                                        name: selected_marker.name,
                                        loc_id: selected_marker.loc_id}}
    
    updated_chunk.location = selected_marker.name === undefined ? {name: ""} : {name: selected_marker.name};
    this.setState(updated_chunk, () => {this.validate_input()});
  }

  validate_input() {
    let regex = /^\d+$/; // Any digit
    let valid = (this.state.location.name === "" ||
                 Object.keys(this.state.selected_loc).length === 0 ||
                 regex.test(this.state.depth) === false ||
                 this.state.depth === 0 ||
                 regex.test(this.state.duration) === false ||
                 this.state.duration === 0) ? false : true;
    this.setState({input_valid: valid});
  }

  render() {
    // const {firestore_id} = useParams();
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <Fragment>
        {/* do not render when page reloaded and we are still waiting for data from FS */}
        {this.state["selected_loc"] !== undefined &&
          <EditDiveUI dive_data = {this.state}
                      handleSiteChange = {this.handleSiteChange}
                      handleDateChange = {this.handleDateChange}
                      handleDepthChange = {this.handleDepthChange}
                      handleDurationChange = {this.handleDurationChange}
                      handleClickSave = {this.handleClickSave}
                      handleClickClose = {this.handleClickClose}
                      changeSelectedLoc = {this.changeSelectedLoc}
                      />
        }
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // const initial_dialog_data = getDiveById(state, this.props.match.params.firestore_id)
  const initial_dialog_data = getCurrentDiveData(state);
  return { initial_dialog_data }
}

export default connect(
  mapStateToProps,
  { selectDive }
)(withRouter(EditDive));