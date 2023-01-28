import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRole } from "../api/types/globalTypes";
import { Error } from "../components/Error";
import Loading from "../components/Loading";
import PageLayout from "../components/PageLayout";
import { useMeQuery } from "../hooks/useMeQuery";
import CategoryPage from "../pages/client/CategoryPage";
import Restaurant from "../pages/client/Restaurant";
import Restaurants from "../pages/client/Restaurants";
import SearchPage from "../pages/client/SearchPage";
import ConfirmEmail from "../pages/ConfirmEmail";
import EditProfile from "../pages/EditProfile";
import NotFound from "../pages/NotFound";
import Order from "../pages/Order";
import AddDish from "../pages/owner/AddDish";
import AddRestaurant from "../pages/owner/AddRestaurant";
import EditRestaurant from "../pages/owner/EditRestaurant";
import MyRestaurant from "../pages/owner/MyRestaurant";
import MyRestaurants from "../pages/owner/MyRestaurants";

const clientRoutes = [
  {
    path: "/",
    element: <Restaurants />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/category/:slug",
    element: <CategoryPage />,
  },
  {
    path: "/restaurant/:id",
    element: <Restaurant />,
  },
];

const ownerRoutes = [
  {
    path: "/",
    element: <MyRestaurants />,
  },
  {
    path: "/add-restaurant",
    element: <AddRestaurant />,
  },
  {
    path: "/restaurant/:id",
    element: <MyRestaurant />,
  },
  {
    path: "/restaurant/:restaurantId/edit-restaurant",
    element: <EditRestaurant />,
  },
  {
    path: "/restaurant/:restaurantId/add-dish",
    element: <AddDish />,
  },
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
          {data.me.role === UserRole.Client &&
            clientRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          {data.me.role === UserRole.Owner &&
            ownerRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          <Route path="/edit-profile" element={<EditProfile />} />,
          <Route path="/orders/:id" element={<Order />} />
        </Route>
        <Route path="/confirm/*" element={<ConfirmEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
