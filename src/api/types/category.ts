/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface category_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: category_allCategories_categories[] | null;
}

export interface category_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface category_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  address: string;
  isPromoted: boolean;
  category: category_category_restaurants_category | null;
}

export interface category_category_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalItems: number | null;
  restaurants: category_category_restaurants[] | null;
  category: category_category_category | null;
}

export interface category {
  allCategories: category_allCategories;
  category: category_category;
}

export interface categoryVariables {
  categoryInput: CategoryInput;
}
