import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { LoggedInRouter } from "../routes/logged-in-router";
import { LoggedOutRouter } from "../routes/logged-out-router";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}
