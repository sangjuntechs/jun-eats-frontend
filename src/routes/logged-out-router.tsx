import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "../pages/404";
import CreateAccount from "../pages/create-account";
import LoginPage from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create-account'>
          <CreateAccount />
        </Route>
        <Route path='/' exact>
          <LoginPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
