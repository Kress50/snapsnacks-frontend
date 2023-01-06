/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_loginAccount {
  __typename: "LoginAccountOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginMutation {
  loginAccount: LoginMutation_loginAccount;
}

export interface LoginMutationVariables {
  loginAccountInput: LoginAccountInput;
}
