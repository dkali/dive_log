// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect, withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';

const centered_style = {
  position: "absolute",
  left: "40%",
};

const progress_style = {
  position: "absolute",
  left: "40%",
  top: "40%",
};

var sign_in_states = Object.freeze({ "unknown": 0, "sign_in_required": 1, "logged_in": 2 })

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: sign_in_states.unknown,
    }

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePswdChange = this.handlePswdChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePswdChange(event) {
    this.setState({ password: event.target.value });
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({ isSignedIn: sign_in_states.logged_in });
        } else {
          this.setState({ isSignedIn: sign_in_states.sign_in_required });
        }
      }
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleSignInClick() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (firebaseUser) {
        // Success
      })
      .catch(function (error) {
        // Handle Errors here
        console.log("Failed to SignIn: error code ", error.code, " msg: ", error.message);
      });
  }
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
  };

  render() {
    console.log("sign-in: render login page");

    const { state } = this.props.location;
    const { from } = state || { from: { pathname: "/" } };

    if (this.state.isSignedIn === sign_in_states.logged_in) {
      return <Redirect push to={from} />;
    } else if (this.state.isSignedIn === sign_in_states.unknown) {
      return <CircularProgress color="primary" style={progress_style} />
    }

    return (
      <div>
        <div style={centered_style}>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />

          <p>or enter with local account:</p>
          <div>
            <TextField id="email" label="email" onChange={this.handleEmailChange} />
          </div>
          <div>
            <TextField id="password" label="password" onChange={this.handlePswdChange} />
          </div>
          <p></p>
          <div>
            <Button variant="contained" color="primary" onClick={this.handleSignInClick}>Sign-in</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInScreen);