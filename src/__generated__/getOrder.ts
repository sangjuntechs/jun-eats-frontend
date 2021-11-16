/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrder
// ====================================================

export interface getOrder_getOrder_order_driver {
  __typename: "User";
  email: string;
}

export interface getOrder_getOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface getOrder_getOrder_order_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface getOrder_getOrder_order_items_dish_option {
  __typename: "DishOption";
  name: string;
  extra: number | null;
}

export interface getOrder_getOrder_order_items_dish {
  __typename: "Dish";
  price: number;
  name: string;
  option: getOrder_getOrder_order_items_dish_option[] | null;
}

export interface getOrder_getOrder_order_items {
  __typename: "OrderItem";
  dish: getOrder_getOrder_order_items_dish;
}

export interface getOrder_getOrder_order {
  __typename: "Order";
  id: number;
  total: number | null;
  status: OrderStatus;
  driver: getOrder_getOrder_order_driver | null;
  customer: getOrder_getOrder_order_customer | null;
  restaurant: getOrder_getOrder_order_restaurant | null;
  items: getOrder_getOrder_order_items[];
}

export interface getOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: getOrder_getOrder_order | null;
}

export interface getOrder {
  getOrder: getOrder_getOrder;
}

export interface getOrderVariables {
  input: GetOrderInput;
}
