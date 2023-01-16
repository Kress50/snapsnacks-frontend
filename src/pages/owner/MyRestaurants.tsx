import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../api/fragments";
import { myRestaurants } from "../../api/types/myRestaurants";
import RestaurantsList from "../../components/RestaurantsList";
import { Button } from "../../components/UI/Button";

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      error
      ok
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const MyRestaurants = () => {
  const { data, loading } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);

  return (
    <>
      <Helmet>
        <title>My Restaurants | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">
        <h2 className="mt-24 mb-12 flex justify-center text-center text-2xl font-bold">
          My Restaurants
        </h2>
        {data?.myRestaurants.ok &&
          data.myRestaurants.restaurants?.length === 0 && (
            <div className="mt-24 flex flex-col items-center justify-center text-center">
              <h4>There are no restaurants.</h4>
              <Link
                className="link mt-2 text-lg font-bold"
                to="/add-restaurant"
              >
                Create one!
              </Link>
            </div>
          )}
        {data?.myRestaurants.ok &&
          data.myRestaurants.restaurants?.length! > 0 && (
            <>
              <RestaurantsList data={data?.myRestaurants} />
              <div className="my-12 flex justify-center">
                <Button
                  actionText="Add Restaurant"
                  loading={loading}
                  canClick={!loading}
                  link="/add-restaurant"
                />
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default MyRestaurants;
