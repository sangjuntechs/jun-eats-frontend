/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatesInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderUpdates
// ====================================================

export interface orderUpdates_orderUpdates_driver {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_customer {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface orderUpdates_orderUpdates_items_dish_option {
  __typename: "DishOption";
  name: string;
  extra: number | null;
}

export interface orderUpdates_orderUpdates_items_dish {
  __typename: "Dish";
  price: number;
  name: string;
  option: orderUpdates_orderUpdates_items_dish_option[] | null;
}

export interface orderUpdates_orderUpdates_items {
  __typename: "OrderItem";
  dish: orderUpdates_orderUpdates_items_dish;
}

export interface orderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  driver: orderUpdates_orderUpdates_driver | null;
  customer: orderUpdates_orderUpdates_customer | null;
  restaurant: orderUpdates_orderUpdates_restaurant | null;
  items: orderUpdates_orderUpdates_items[];
}

export interface orderUpdates {
  orderUpdates: orderUpdates_orderUpdates;
}

export interface orderUpdatesVariables {
  input: OrderUpdatesInput;
}
