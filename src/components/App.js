import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimpleTabs from './Tabs';
import AddDive from './AddDiveDialog';
import EditDive from './EditDiveDialog';
import SelectLocation from './SelectLocation';

const NoMatch = () => <h1>404 Not Found :(</h1>

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div className='app'>
          <Switch>
            <Route exact path="/" component={SimpleTabs}/>
            <Route path="/add_dive" component={AddDive}/>
            <Route path="/edit_dive" component={EditDive}/>
            <Route path="/select_location" component={SelectLocation}/>
            <Route component={NoMatch}/>
          </Switch>
        </div> 
      </BrowserRouter>
    )
  }
}

export default App;