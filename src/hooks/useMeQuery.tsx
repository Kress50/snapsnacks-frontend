import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../api/types/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
      verification {
        code
      }
    }
  }
`;

export const useMeQuery = () => {
  return useQuery<meQuery>(ME_QUERY);
};
