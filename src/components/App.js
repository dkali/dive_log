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
} else {
  firebase.app(); // if already initialized, use that one
}


class App extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: SignInStates.unknown // Local signed-in state.
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({ isSignedIn: SignInStates.logged_in });
        } else {
          this.setState({ isSignedIn: SignInStates.sign_in_required });
        }
      }
    );
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
              <PrivateRoute exact path="/" component={SimpleTabs} isSignedIn={this.state.isSignedIn} />
              <Route path="/login" component={SignInScreen} />
              <PrivateRoute path="/add_dive" component={AddDive} isSignedIn={this.state.isSignedIn} />
              <PrivateRoute path="/edit_dive" component={EditDive} isSignedIn={this.state.isSignedIn} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App;