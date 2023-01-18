import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../api/fragments";
import { restaurant, restaurantVariables } from "../../api/types/restaurant";
import RestaurantHero from "../../components/RestaurantHero";

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
  const restaurantData = data?.Restaurant.restaurant;
  return (
    <>
      <Helmet>
        <title>
          {data?.Restaurant.restaurant?.name || "Restaurant"} | Snapsnacks
        </title>
      </Helmet>
      <div className="pt-20">
        <RestaurantHero
          address={restaurantData?.address}
          categoryName={restaurantData?.category?.name}
          coverImage={restaurantData?.coverImage}
          isPromoted={restaurantData?.isPromoted}
          name={restaurantData?.name}
        />
      </div>
    </>
  );
};
export default Restaurant;
