import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SimpleTabs from './Tabs';
import AddDive from './AddDive';
import EditDive from './EditDive';
import SignInScreen from './SignInScreen';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import TopAppBar from './TopAppBar';
import PrivateRoute from './../helpers/PrivateRoute';
import SignInStates from './../helpers/enums';
import { CssBaseline } from '@mui/material';
import DiveLocation from '../helpers/DiveLocation.js'
import { connect } from "react-redux";
import { initStore } from "../redux/actions";
import { initFirebase, getAuthState, getFirestoreInstance } from "./../helpers/FirebaseInterface"
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

const theme = createTheme();

const NoMatch = () => <h1>404 Not Found :(</h1>

// Configure Firebase.
initFirebase();

function App(props) {
  const [signedState, setSignedState] = useState(SignInStates.unknown);
  const { initStore } = props;

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const initFireStore = (user) => {
      // init FireStore
      const db = getFirestoreInstance();
      console.log("initializing store for user id " + user.uid);
      const divesRef = collection(db, "dives");
      const q = query(divesRef, where("user", "==", user.uid), orderBy("timestamp", "desc"));
      return onSnapshot(q, function(querySnapshot) {
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
        initStore(dive_list_init);
      });
    }
    
    // Listen to the Firebase Auth state and set the local state.
    let unsubscribeDives = () => {};
    let unregisterAuthObserver = onAuthStateChanged(getAuthState(),
      (user) => {
        unsubscribeDives();
        if (user) {
          setSignedState(SignInStates.logged_in);
          unsubscribeDives = initFireStore(user);
        } else {
          setSignedState(SignInStates.sign_in_required);
        }
      }
    );

    // Make sure we un-register Firebase observers when the component unmounts.
    return function unregister() {
      unregisterAuthObserver();
      unsubscribeDives();
    }
  }, [initStore])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <TopAppBar />
        <div>
          <Routes>
            <Route path="/" element={
              <PrivateRoute isSignedIn={signedState}>
                <SimpleTabs />
              </PrivateRoute>
            } />
            <Route path="/login" element={
              signedState === SignInStates.logged_in
                ? <Navigate to="/" replace />
                : <SignInScreen />
            } />
            <Route path="/add_dive" element={
              <PrivateRoute isSignedIn={signedState}>
                <AddDive />
              </PrivateRoute>
            } />
            <Route path="/dive/:firestore_id" element={
              <PrivateRoute isSignedIn={signedState}>
                <EditDive />
              </PrivateRoute>
            } />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default connect(
  null,
  { initStore }
)(App);