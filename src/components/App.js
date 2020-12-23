import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimpleTabs from './Tabs';
import AddDive from './AddDiveDialog';
import EditDive from './EditDiveDialog';
import SignInScreen from './SignInScreen';
import firebase from 'firebase/app';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import TopAppBar from './TopAppBar';
import PrivateRoute from './../helpers/PrivateRoute';
import SignInStates from './../helpers/enums';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#E10050',
    },
  },

  overrides: {
    MuiInput: {
      root: {
        color: "#ffebee",
        '& p': {
          color: '#ffebee'
        }
      },
    }
  }
});

const NoMatch = () => <h1>404 Not Found :(</h1>

// Configure Firebase.
var constants = require('../ApiKey.js');
firebase.initializeApp({
  apiKey: constants.FIRESTORE_API_KEY,
  authDomain: 'divelog-ee00d.firebaseapp.com',
  projectId: 'divelog-ee00d'
});

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