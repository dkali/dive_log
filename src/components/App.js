import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimpleTabs from './Tabs';
import AddDive from './AddDiveDialog';
import EditDive from './EditDiveDialog';
import SignInScreen from './SignInScreen';
import SplashScreen from './SplashScreen'
import firebase from 'firebase/app';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import TopAppBar from './TopAppBar';

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
  render() {
    return(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <TopAppBar/>
          <div>
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
      </ThemeProvider>
    )
  }
}

export default App;