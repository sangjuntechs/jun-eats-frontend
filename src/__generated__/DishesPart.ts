/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishesPart
// ====================================================

export interface DishesPart_option_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DishesPart_option {
  __typename: "DishOption";
  name: string;
  choices: DishesPart_option_choices[] | null;
  extra: number | null;
}

export interface DishesPart {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  option: DishesPart_option[] | null;
}
