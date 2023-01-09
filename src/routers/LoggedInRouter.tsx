import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRole } from "../api/types/globalTypes";
import { Error } from "../components/Error";
import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";
import { useMeQuery } from "../hooks/useMeQuery";
import CategoryPage from "../pages/client/CategoryPage";
import Restaurants from "../pages/client/Restaurants";
import SearchPage from "../pages/client/SearchPage";
import ConfirmEmail from "../pages/ConfirmEmail";
import EditProfile from "../pages/EditProfile";
import NotFound from "../pages/NotFound";

const clientRoutes = [
  <Route key={1} path="/" element={<Restaurants />} />,
  <Route key={2} path="/edit-profile" element={<EditProfile />} />,
  <Route key={3} path="/search" element={<SearchPage />} />,
  <Route key={4} path="/category/:slug" element={<CategoryPage />} />,
];

export default function LoggedInRouter() {
  const { data, loading, error } = useMeQuery();

  if (loading || !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Loading />;
      </div>
    );
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
        <Route path="/confirm/*" element={<ConfirmEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
