/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsPageQuery_allCategories_categories[] | null;
}

export interface restaurantsPageQuery_Restaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPageQuery_Restaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: restaurantsPageQuery_Restaurants_restaurants_category | null;
}

export interface restaurantsPageQuery_Restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalItems: number | null;
  restaurants: restaurantsPageQuery_Restaurants_restaurants[] | null;
}

export interface restaurantsPageQuery {
  allCategories: restaurantsPageQuery_allCategories;
  Restaurants: restaurantsPageQuery_Restaurants;
}

export interface restaurantsPageQueryVariables {
  restaurantsInput: RestaurantsInput;
}
