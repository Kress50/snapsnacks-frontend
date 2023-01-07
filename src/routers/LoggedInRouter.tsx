import { gql, useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRole } from "../api/types/globalTypes";
import { meQuery } from "../api/types/meQuery";
import { Error } from "../components/Error";
import Loading from "../components/Loading";
import Restaurants from "../pages/client/Restaurants";
import NotFound from "../pages/NotFound";

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

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default function LoggedInRouter() {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  console.log(data, loading, error);

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error.toString()} />;
  }

  return (
    <BrowserRouter>
      {data.me.role === UserRole.Client && <ClientRoutes />}
    </BrowserRouter>
  );
}
