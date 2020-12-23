import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import SignInStates from './enums';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  var { isSignedIn } = rest;

  if (isSignedIn === SignInStates.logged_in) {
    // User is signed in.
    return (
      <Route {...rest}>
        <Component />
      </Route>
    );
  } else {
    // No user is signed in.
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }
};

export default PrivateRoute;