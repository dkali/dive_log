import { initializeApp } from 'firebase/app';
import { FIRESTORE_DEV_API_KEY, FIRESTORE_PROD_API_KEY } from '../ApiKey.js';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { getFirestore, addDoc, collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

// For development
export function devConfig() {
  return {
    apiKey: FIRESTORE_DEV_API_KEY,
    authDomain: 'divelog-ee00d.firebaseapp.com',
    projectId: 'divelog-ee00d'
  }
}

// For production  
export function prodConfig() {
  return {
    apiKey: FIRESTORE_PROD_API_KEY,
    authDomain: 'divelogprod.firebaseapp.com',
    projectId: 'divelogprod'
  }
}

// Initialize Firebase
let app;
let auth;
let db;

export function initFirebase() {
  if (!app) {
    const config = import.meta.env.PROD ? prodConfig() : devConfig();
    app = initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
  }
}

export function firebaseSignInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed in successfully");
      return user;
    })
    .catch((error) => {
      // Handle Errors here
      console.log("Failed to SignIn: error code ", error.code, " msg: ", error.message);
      throw error;
    });
}

function firebaseSignInWithProvider(provider) {
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Failed to sign in with provider: ", error);
      throw error;
    });
}

export function firebaseSignInWithGoogle() {
  return firebaseSignInWithProvider(new GoogleAuthProvider());
}

export function firebaseSignInWithFacebook() {
  return firebaseSignInWithProvider(new FacebookAuthProvider());
}

export function firebaseSignOut() {
  return signOut(auth)
    .then(() => {
      console.log("Signed out successfully");
    })
    .catch((error) => {
      console.log("Failed to sign out: error code ", error.code, " msg: ", error.message);
      throw error;
    });
}

export function getCurrentUserId() {
  return auth.currentUser?.uid || null;
}

export function createFireStoreDiveEntry(depth, duration, date, selectedLoc, userId = null) {
  const diveUserId = userId || getCurrentUserId();
  if (!diveUserId) {
    throw new Error('Cannot create a dive without a signed-in user.');
  }

  let fire_store_entry = {
    depth: Number(depth),
    duration: Number(duration),
    timestamp: date,
    user: diveUserId,
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
  const userId = fs_dive_data.user || getCurrentUserId();
  if (!userId) {
    return Promise.reject(new Error('Cannot save a dive without a signed-in user.'));
  }
  fs_dive_data.user = userId;
  
  return addDoc(collection(db, "dives"), fs_dive_data)
    .then((docRef) => {
      console.log("New Dive added with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error adding dive: ", error);
      throw error;
    });
}

export function firebaseCreateLocAndAddDive(fs_location_data, fs_dive_data) {
  // first we need to create a location entry
  return addDoc(collection(db, "locations"), fs_location_data)
    .then((docRef) => {
      console.log("New Location created with ID: ", docRef.id);

      fs_dive_data.location = {
        geopoint: fs_location_data.geopoint,
        loc_id: docRef.id,
        name: fs_location_data.name,
      };

      // now add a new dive using created location
      return firebaseAddDive(fs_dive_data);
    })
    .catch((error) => {
      console.error("Error creating location: ", error);
      throw error;
    });
}

export function firebaseUpdateDive(dive_id, fs_dive_data) {
  const docRef = doc(db, "dives", dive_id);
  
  return setDoc(docRef, fs_dive_data)
    .then(() => {
      console.log("Dive ID ", dive_id, " updated");
    })
    .catch((error) => {
      console.error("Error updating dive: ", error);
      throw error;
    });
}

export function firebaseCreateLocationAndUpdateDive(fs_location_data, dive_id, fs_dive_data) {
  // first we need to create a location entry
  return addDoc(collection(db, "locations"), fs_location_data)
    .then((docRef) => {
      console.log("New Location created with ID: ", docRef.id);

      fs_dive_data.location = {
        geopoint: fs_location_data.geopoint,
        loc_id: docRef.id,
        name: fs_location_data.name,
      };

      // update dive using created location
      return firebaseUpdateDive(dive_id, fs_dive_data);
    })
    .catch((error) => {
      console.error("Error creating location: ", error);
      throw error;
    });
}

export function firebaseDeleteDive(dive_id){
  const docRef = doc(db, "dives", dive_id);
  
  return deleteDoc(docRef)
    .then(() => {
      console.log("Dive successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing dive: ", error);
      throw error;
    });
}

export function getAuthState() {
  return auth;
}

export function getFirestoreInstance() {
  return db;
}