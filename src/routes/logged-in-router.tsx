/* eslint-disable array-callback-return */
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
import RestaurantDetail from "../pages/client/restaurantDetail";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";
import VerifyError from "../pages/verify-error";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { AddRestaurant } from "../pages/owner/add-restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { AddDish } from "../pages/owner/add-dish";
import { Order } from "../pages/user/order";

const commonRoutes = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/orders/:id",
    component: <Order />,
  }
];

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  { path: "/verify-error", component: <VerifyError /> },
  {
    path: "/editprofile-error",
    component: <EditProfileError />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  { path: "/restaurants/:id", component: <RestaurantDetail /> },
];

const OwnerRoutes = [{
  path: "/",
  component: <MyRestaurant />
}, {
  path: "/add-restaurant",
  component: <AddRestaurant />
},
{
  path: "/restaurants/:id",
  component: <MyRestaurants />
},
{
  path: "/restaurants/:restaurantId/add-dish",
  component: <AddDish />
}];

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
          {data.me.role === "Client" &&
            clientRoutes.map((route) => {
              return (
                <Route key={route.path} path={route.path} exact>
                  {route.component}
                </Route>
              );
            })}
          {data.me.role === "Owner" &&
            OwnerRoutes.map((route) => {
              return (
                <Route key={route.path} path={route.path} exact>
                  {route.component}
                </Route>
              );
            })}
          {commonRoutes.map((route) => {
            return (
              <Route key={route.path} path={route.path} exact>
                {route.component}
              </Route>
            );
          })}

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
