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

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface EditAccountInput {
  email?: string | null;
  password?: string | null;
}

export interface LoginAccountInput {
  email: string;
  password: string;
}

export interface RestaurantsInput {
  page: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
