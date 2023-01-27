/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategoryInput {
  page: number;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  name: string;
  coverImage?: string | null;
  price: number;
  description: string;
  options?: DishOptionsInputType[] | null;
  restaurantId: number;
}

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreatePaymentInput {
  transactionId: string;
  restaurantId: number;
}

export interface CreateRestaurantInput {
  name: string;
  coverImage: string;
  address: string;
  categoryName: string;
}

export interface DeleteDishInput {
  dishId: number;
}

export interface DeleteRestaurantInput {
  restaurantId: number;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionsInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

export interface EditAccountInput {
  email?: string | null;
  password?: string | null;
}

export interface EditRestaurantInput {
  name?: string | null;
  coverImage?: string | null;
  address?: string | null;
  categoryName?: string | null;
  restaurantId: number;
}

export interface LoginAccountInput {
  email: string;
  password: string;
}

export interface MyRestaurantInput {
  id: number;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page: number;
}

export interface SearchRestaurantInput {
  page: number;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
