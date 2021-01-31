import firebase from 'firebase/app';

export function firebaseSignInUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (firebaseUser) {
      // Success
    })
    .catch(function (error) {
      // Handle Errors here
      console.log("Failed to SignIn: error code ", error.code, " msg: ", error.message);
    });
}

export function createFireStoreDiveEntry(depth, duration, date, selectedLoc) {
  let fire_store_entry = {
    depth: Number(depth),
    duration: Number(duration),
    timestamp: date,
    user: firebase.auth().currentUser.uid,
    location: {
      geopoint: selectedLoc.geopoint,
      loc_id: selectedLoc.loc_id,
      name: selectedLoc.name,
    },
  };

  return fire_store_entry;
}

export function createFireStoreLocationEntry(selectedLoc, location) {
  let fs_location_data = {
    description: "",
    geopoint: selectedLoc.geopoint,
    name: location.name
  };

  return fs_location_data
}

export function firebaseAddDive(fs_dive_data) {
  var db = firebase.firestore();

  db.collection("dives").add(fs_dive_data)
    .then(function (docRef) {
      console.log("New Dive added with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding dive: ", error);
    });
}

export function firebaseCreateLocAndAddDive(fs_location_data, fs_dive_data) {
  var db = firebase.firestore();

  // first we need to create a location entry
  db.collection("locations").add(fs_location_data)
    .then(function (docRef) {
      console.log("New Location created with ID: ", docRef.id);

      fs_dive_data.location = {
        geopoint: fs_location_data.geopoint,
        loc_id: docRef.id,
        name: fs_location_data.name,
      };

      // now add a new dive using created location
      firebaseAddDive(fs_dive_data);
    })
    .catch(function (error) {
      console.error("Error creating location: ", error);
    });
}

export function firebaseUpdateDive(dive_id, fs_dive_data) {
  var db = firebase.firestore();

  db.collection("dives").doc(dive_id).set(fs_dive_data)
    .then(function() {
      console.log("Dive ID ", dive_id, " updated");
    })
    .catch(function(error) {
      console.error("Error updating dive: ", error);
    });
}

export function firebaseCreateLocationAndUpdateDive(fs_location_data, dive_id, fs_dive_data) {
  var db = firebase.firestore();

  db.collection("locations").add(fs_location_data)
    .then(function(docRef) {
      console.log("New Location created with ID: ", docRef.id);

      fs_dive_data.location = {
        geopoint: fs_location_data.geopoint,
        loc_id: docRef.id,
        name: fs_location_data.name,
      };

      // update dive using created location
      firebaseUpdateDive(dive_id, fs_dive_data);
    })
    .catch(function(error) {
      console.error("Error creating location: ", error);
    });
}

export function firebaseDeleteDive(dive_id){
  var db = firebase.firestore();

  db.collection("dives").doc(dive_id).delete().then(function () {
    console.log("Dive successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing dive: ", error);
  });
}

export function devConfig() {
  var constants = require('../ApiKey.js');
  return {
    apiKey: constants.FIRESTORE_DEV_API_KEY,
    authDomain: 'divelog-ee00d.firebaseapp.com',
    projectId: 'divelog-ee00d'
  }
}

export function prodConfig() {
  var constants = require('../ApiKey.js');
  return {
    apiKey: constants.FIRESTORE_PROD_API_KEY,
    authDomain: 'divelogprod.firebaseapp.com',
    projectId: 'divelogprod'
  }
}