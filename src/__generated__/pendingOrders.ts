/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_driver {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_customer {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface pendingOrders_pendingOrders_items_dish_option {
  __typename: "DishOption";
  name: string;
  extra: number | null;
}

export interface pendingOrders_pendingOrders_items_dish {
  __typename: "Dish";
  price: number;
  name: string;
  option: pendingOrders_pendingOrders_items_dish_option[] | null;
}

export interface pendingOrders_pendingOrders_items {
  __typename: "OrderItem";
  dish: pendingOrders_pendingOrders_items_dish;
}

export interface pendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  driver: pendingOrders_pendingOrders_driver | null;
  customer: pendingOrders_pendingOrders_customer | null;
  restaurant: pendingOrders_pendingOrders_restaurant | null;
  items: pendingOrders_pendingOrders_items[];
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
