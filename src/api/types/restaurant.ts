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

export interface restaurant_Restaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface restaurant_Restaurant_restaurant_menu_options {
  __typename: "DishOptions";
  name: string;
  extra: number | null;
  choices: restaurant_Restaurant_restaurant_menu_options_choices[] | null;
}

export interface restaurant_Restaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  coverImage: string | null;
  price: number;
  description: string;
  options: restaurant_Restaurant_restaurant_menu_options[] | null;
}

export interface restaurant_Restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: restaurant_Restaurant_restaurant_category | null;
  menu: restaurant_Restaurant_restaurant_menu[];
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
