/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurant
// ====================================================

export interface restaurant_Restaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface restaurant_Restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: restaurant_Restaurant_restaurant_category | null;
}

export interface restaurant_Restaurant {
  __typename: "RestaurantOutput";
  error: string | null;
  ok: boolean;
  restaurant: restaurant_Restaurant_restaurant | null;
}

export interface restaurant {
  Restaurant: restaurant_Restaurant;
}

export interface restaurantVariables {
  restaurantInput: RestaurantInput;
}
