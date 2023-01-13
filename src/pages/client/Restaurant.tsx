import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../api/fragments";
import { restaurant, restaurantVariables } from "../../api/types/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($restaurantInput: RestaurantInput!) {
    Restaurant(input: $restaurantInput) {
      error
      ok
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const Restaurant = () => {
  const params = useParams();
  const { data, loading } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        restaurantInput: {
          restaurantId: Number(params.id),
        },
      },
    }
  );
  return (
    <>
      <Helmet>
        <title>
          {data?.Restaurant.restaurant?.name || "Restaurant"} | Snapsnacks
        </title>
      </Helmet>
      <div className="pt-20">
        <div
          className="bg-cover bg-center pb-80 opacity-90 shadow-xl"
          style={{
            backgroundImage: `url(${data?.Restaurant.restaurant?.coverImage})`,
          }}
        >
          <div
            className={`relative top-24 flex w-1/2 flex-col bg-white py-4 pl-4 lg:w-3/12 xl:pl-20 ${
              data?.Restaurant.restaurant?.isPromoted
                ? "shadow-promoted shadow-amber-500"
                : ""
            }`}
          >
            <h4 className="mb-3 text-3xl font-bold">
              {data?.Restaurant.restaurant?.name}
            </h4>
            <h5 className="text-md mb-2 font-normal">
              {data?.Restaurant.restaurant?.category?.name}
            </h5>
            <h6 className="border-t border-gray-300 pt-2 text-sm font-light">
              {data?.Restaurant.restaurant?.address}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
export default Restaurant;
