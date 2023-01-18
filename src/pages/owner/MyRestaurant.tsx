import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../api/fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../api/types/myRestaurant";
import RestaurantHero from "../../components/RestaurantHero";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const MyRestaurant = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    { variables: { myRestaurantInput: { id: +id! } } }
  );
  const restaurantData = data?.myRestaurant.restaurant;
  console.log(data);
  return (
    <>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || `My Restaurant`} | SnapSnacks
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

export default MyRestaurant;
