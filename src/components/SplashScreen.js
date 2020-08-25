// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import App from './App'
import { Redirect } from 'react-router';

var sign_in_states = Object.freeze({"unknown": 0, "sign_in_required": 1, "logged_in": 2})

class SplashScreen extends React.Component {
  
  // The component's Local state.
  state = {
    isSignedIn: sign_in_states.unknown // Local signed-in state.
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({isSignedIn: sign_in_states.logged_in})
        } else {
          this.setState({isSignedIn: sign_in_states.sign_in_required})
        }
      }
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    switch (this.state.isSignedIn) {
      case sign_in_states.sign_in_required:
        console.log("SplashScreen: redirect to /login");
        return <Redirect push to="/login" />;

      case sign_in_states.logged_in:
        console.log("SplashScreen: redirect to /main");
        return <Redirect push to="/main" />;

      default:
        console.log("SplashScreen: redirect to Splash Screen");
        return (
          <div>
            <h1>Splash Screen</h1>
          </div>
        );
    }
  }
}

export default SplashScreen;