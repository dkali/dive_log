import React from "react";
import { LinearProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import SignInStates from './enums';

const PrivateRoute = ({ isSignedIn, children }) => {
  if (isSignedIn === SignInStates.unknown) {
    return <LinearProgress aria-label="Checking sign-in status" />;
  }
  if (isSignedIn === SignInStates.logged_in) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;