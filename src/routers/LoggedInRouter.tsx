import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../api/types/meQuery";
import { Error } from "../components/Error";
import Loading from "../components/Loading";

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

export default function LoggedInRouter() {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (error) {
    return <Error errorMessage={error.toString()} />;
  }

  if (!data || loading) {
    return <Loading />;
  }

  return <div>Loaded</div>;
}
