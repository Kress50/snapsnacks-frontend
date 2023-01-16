/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: addRestaurantCategories
// ====================================================

export interface addRestaurantCategories_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface addRestaurantCategories_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: addRestaurantCategories_allCategories_categories[] | null;
}

export interface addRestaurantCategories {
  allCategories: addRestaurantCategories_allCategories;
}
