// Import FirebaseAuth and firebase.
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect, useLocation } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';
import { firebaseSignInUser } from '../helpers/FirebaseInterface';
import Grid from '@material-ui/core/Grid';
import SignInStates from './../helpers/enums';

function SignInScreen() {
  const [signedState, setSignedState] = useState(SignInStates.unknown);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePswdChange = (event) => {
    setPassword(event.target.value);
  }

  useEffect(() => {
    // Listen to the Firebase Auth state and set the local state.
    let unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          setSignedState(SignInStates.logged_in);
        } else {
          setSignedState(SignInStates.sign_in_required);
        }
      }
    );

    // Make sure we un-register Firebase observers when the component unmounts.
    return function unregister() {
      unregisterAuthObserver();
    }
  }, [])

  const handleSignInClick = () => {
    firebaseSignInUser(email, password);
  }

  // Configure FirebaseUI.
  let uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
  };

  console.log("sign-in: render login page");

  const { state } = useLocation();
  const { from } = state || { from: { pathname: "/" } };

  if (signedState === SignInStates.logged_in) {
    return <Redirect push to={from} />;
  } else if (signedState === SignInStates.unknown) {
    return <LinearProgress color="secondary" />
  }

  return (
    <Grid container
      direction="column"
      alignItems="center">

      <Grid item>
        <p>Please sign-in with</p>
      </Grid>
      <Grid item>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Grid>
      <Grid item>
        <p>or enter with local account</p>
      </Grid>
      <Grid item>
        <TextField id="email" label="email" onChange={handleEmailChange} />
      </Grid>
      <Grid item>
        <TextField id="password" label="password" onChange={handlePswdChange} />
      </Grid>
      <Grid item>
        .
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleSignInClick}>
          Sign-in
        </Button>
      </Grid>
    </Grid>
  );
}

export default SignInScreen;