// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router';

const centered_style = {
  position: "absolute",
  left: "40%",
}

var sign_in_states = Object.freeze({"unknown": 0, "sign_in_required": 1, "logged_in": 2})

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
    this.setState({email: event.target.value});
  }

  handlePswdChange(event) {
    this.setState({password: event.target.value});
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.setState({isSignedIn: sign_in_states.logged_in});
        } else {
          this.setState({isSignedIn: sign_in_states.sign_in_required});
        }
      }
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleSignInClick(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(firebaseUser) {
      // Success
    })
    .catch(function(error) {
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
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/',
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: () => false
    // }
  };

  render() {
    console.log("sign-in: render login page");

    if (this.state.isSignedIn === sign_in_states.logged_in) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <div style={centered_style}>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          
          <p>or enter with local account:</p>
          <div>
            <TextField id="standard-basic" label="email" onChange={this.handleEmailChange}/>
          </div>
          <div>
            <TextField id="standard-basic" label="password" onChange={this.handlePswdChange}/>
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

export default SignInScreen;