import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../api/fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../api/types/myRestaurant";
import RestaurantHero from "../../components/RestaurantHero";
import { Button } from "../../components/UI/Button";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const MyRestaurant = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    { variables: { myRestaurantInput: { id: +id! } } }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.myRestaurant.error || error) {
      navigate("/error");
    }
  }, [data?.myRestaurant.error, navigate, error]);

  const restaurantData = data?.myRestaurant.restaurant;
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
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-8">
          <h2 className="text-3xl font-bold">
            {data?.myRestaurant.restaurant?.name || `My Restaurant`} Dashboard
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              actionText="Edit Restaurant"
              loading={false}
              canClick={true}
              link={`/restaurant/${id}/edit-restaurant`}
            />
            <Button
              actionText="Add Dish"
              loading={false}
              canClick={true}
              link={`/restaurant/${id}/add-dish`}
            />
            <Button
              actionText="Buy Promotion"
              loading={false}
              canClick={true}
            />
          </div>
          <div className="border-t-2">
            {restaurantData?.menu.length === 0 ? (
              <h4 className="py-8 text-center text-xl font-semibold">
                Your menu has no dishes
              </h4>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRestaurant;
