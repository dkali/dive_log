// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  firebaseSignInUser,
  firebaseSignInWithFacebook,
  firebaseSignInWithGoogle,
  initFirebase
} from '../helpers/FirebaseInterface';

initFirebase();

function SignInScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    firebaseSignInUser(email, password)
      .catch((error) => {
        // Handle Errors here
        console.log("Failed to SignIn: error code ", error.code, " msg: ", error.message);
        setError(error.message);
      });
  };

  const handleProviderSignIn = (signIn) => {
    setError('');
    signIn()
      .catch((error) => {
        console.error("Failed to sign in: ", error);
        setError(error.message);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign In</h2>
      <Button
        variant="contained"
        onClick={() => handleProviderSignIn(firebaseSignInWithGoogle)}
      >
        Sign in with Google
      </Button>
      <Button
        variant="contained"
        onClick={() => handleProviderSignIn(firebaseSignInWithFacebook)}
        style={{ marginLeft: 8 }}
      >
        Sign in with Facebook
      </Button>
      <form onSubmit={handleSignIn}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default SignInScreen;