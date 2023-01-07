import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../api/types/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMeQuery = () => {
  return useQuery<meQuery>(ME_QUERY);
};
