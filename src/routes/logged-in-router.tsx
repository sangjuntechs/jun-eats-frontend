/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Header from "../components/header";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import NotFound from "../pages/404";
import Restaurants from "../pages/client/restaurants";

const ClientRoutes = () => (
  <>
    <Route path="/" exact>
      <Restaurants />
    </Route>
  </>
);

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
  };

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
          <Route path="/" exact>
          {data.me.role === "Client" && <ClientRoutes />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <button onClick={onClick}>logout</button>
    </>
  );
};
