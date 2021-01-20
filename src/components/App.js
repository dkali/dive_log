import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimpleTabs from './Tabs';
import AddDive from './AddDive';
import EditDive from './EditDive';
import SignInScreen from './SignInScreen';
import firebase from 'firebase/app';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import TopAppBar from './TopAppBar';
import PrivateRoute from './../helpers/PrivateRoute';
import SignInStates from './../helpers/enums';
import { CssBaseline } from '@material-ui/core';
import DiveLocation from '../helpers/DiveLocation.js'
import { connect } from "react-redux";
import { initStore } from "../redux/actions";

const theme = createMuiTheme();

const NoMatch = () => <h1>404 Not Found :(</h1>

// Configure Firebase.
var constants = require('../ApiKey.js');
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: constants.FIRESTORE_API_KEY,
    authDomain: 'divelog-ee00d.firebaseapp.com',
    projectId: 'divelog-ee00d'
  });
}

class App extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: SignInStates.unknown // Local signed-in state.
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    let unsubscribe = () => {};
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({ isSignedIn: SignInStates.logged_in });
          unsubscribe = this.initFireStore();
        } else {
          this.setState({ isSignedIn: SignInStates.sign_in_required });
          unsubscribe();
        }
      }
    );
  }

  initFireStore() {
    // init FireStore   
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    if (user != null) {
      console.log("initializing store for user id " + user.uid);
      var divesRef = db.collection("dives");
      var query = divesRef.where("user", "==", user.uid).orderBy("timestamp", "desc");
      var vld = this;
      var unsubscribe = query.onSnapshot(function(querySnapshot) {
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
        });

        // save data to redux
        vld.props.initStore(dive_list_init);
      })

      return unsubscribe;
    }
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TopAppBar />
          <div>
            <Switch>
              <PrivateRoute exact path="/"
                component={SimpleTabs}
                isSignedIn={this.state.isSignedIn} />
              <Route path="/login"
                component={SignInScreen} />
              <PrivateRoute path="/add_dive"
                component={AddDive}
                isSignedIn={this.state.isSignedIn} />
              <PrivateRoute path={"/dive/:firestore_id"}
                component={EditDive}
                isSignedIn={this.state.isSignedIn} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default connect(
  null,
  { initStore }
)(App);