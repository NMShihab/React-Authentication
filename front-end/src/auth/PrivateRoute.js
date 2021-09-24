import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = (props) => {
  const user = null;

  if (!user) return <Redirect to="/login" />;

  return <Route {...props} />;
};
