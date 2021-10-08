/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantsPart
// ====================================================

export interface RestaurantsPart_category {
  __typename: "Category";
  name: string;
}

export interface RestaurantsPart {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: RestaurantsPart_category | null;
  address: string;
  isPromoted: boolean;
}
