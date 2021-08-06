import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import LoginPage from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create-account'>
          <CreateAccount />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
};
