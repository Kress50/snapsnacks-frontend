/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditAccountMutation
// ====================================================

export interface EditAccountMutation_editProfile {
  __typename: "EditAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface EditAccountMutation {
  editProfile: EditAccountMutation_editProfile;
}

export interface EditAccountMutationVariables {
  editAccountInput: EditAccountInput;
}
