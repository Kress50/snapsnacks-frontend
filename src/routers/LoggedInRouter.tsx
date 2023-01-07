import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRole } from "../api/types/globalTypes";
import { Error } from "../components/Error";
import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";
import { useMeQuery } from "../hooks/useMeQuery";
import Restaurants from "../pages/client/Restaurants";
import NotFound from "../pages/NotFound";

const clientRoutes = [<Route path="/" element={<Restaurants />} />];

export default function LoggedInRouter() {
  const { data, loading, error } = useMeQuery();

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error.toString()} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          {data.me.role === UserRole.Client && clientRoutes}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
