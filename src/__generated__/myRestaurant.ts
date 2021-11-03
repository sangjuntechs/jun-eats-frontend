/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurant
// ====================================================

export interface myRestaurant_myRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurant_myRestaurant_restaurant_menu_option_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu_option {
  __typename: "DishOption";
  name: string;
  choices: myRestaurant_myRestaurant_restaurant_menu_option_choices[] | null;
  extra: number | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  option: myRestaurant_myRestaurant_restaurant_menu_option[] | null;
}

export interface myRestaurant_myRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: myRestaurant_myRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: myRestaurant_myRestaurant_restaurant_menu[];
}

export interface myRestaurant_myRestaurant {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurant: myRestaurant_myRestaurant_restaurant | null;
}

export interface myRestaurant {
  myRestaurant: myRestaurant_myRestaurant;
}

export interface myRestaurantVariables {
  input: MyRestaurantsInput;
}
