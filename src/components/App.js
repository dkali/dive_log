import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimpleTabs from './Tabs';
import AddDive from './AddDiveDialog';
import EditDive from './EditDiveDialog';
import SignInScreen from './SignInScreen';
import SplashScreen from './SplashScreen'
import firebase from 'firebase/app';

const NoMatch = () => <h1>404 Not Found :(</h1>

// Configure Firebase.
var constants = require('../ApiKey.js'); 
firebase.initializeApp({
  apiKey: constants.FIRESTORE_API_KEY,
  authDomain: 'divelog-ee00d.firebaseapp.com',
  projectId: 'divelog-ee00d'
});

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div className='app'>
          <Switch>
            <Route exact path="/" component={SplashScreen}/>
            <Route path="/login" component={SignInScreen}/>
            <Route path="/main" component={SimpleTabs}/>
            <Route path="/add_dive" component={AddDive}/>
            <Route path="/edit_dive" component={EditDive}/>
            <Route component={NoMatch}/>
          </Switch>
        </div> 
      </BrowserRouter>
    )
  }
}

export default App;