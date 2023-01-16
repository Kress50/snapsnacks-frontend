/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRestaurants
// ====================================================

export interface myRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: myRestaurants_myRestaurants_restaurants_category | null;
}

export interface myRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  error: string | null;
  ok: boolean;
  restaurants: myRestaurants_myRestaurants_restaurants[] | null;
}

export interface myRestaurants {
  myRestaurants: myRestaurants_myRestaurants;
}
