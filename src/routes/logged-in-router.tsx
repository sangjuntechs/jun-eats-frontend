/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import NotFound from "../pages/404";
import Category from "../pages/client/category";
import Restaurants from "../pages/client/restaurants";
import Search from "../pages/client/search";
import EditProfileError from "../pages/editProfile-error";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";
import VerifyError from "../pages/verify-error";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/verify-error" exact>
    <VerifyError />
  </Route>,
  <Route key={4} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
  <Route key={5} path="/editprofile-error" exact>
    <EditProfileError />
  </Route>,
  <Route key={6} path='/search' exact>
    <Search />
  </Route>,
  <Route key={7} path='/category/:slug' exact>
    <Category />
  </Route>
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading..</span>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Header email={data.me.email} />
        <Switch>
          {data.me.role === "Client" && ClientRoutes}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
