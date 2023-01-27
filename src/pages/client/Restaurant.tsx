import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../api/fragments";
import { restaurant, restaurantVariables } from "../../api/types/restaurant";
import { orderCartVar } from "../../apollo";
import DishList from "../../components/DishList";
import OrderList from "../../components/OrderList";
import RestaurantHero from "../../components/RestaurantHero";
import { useMeQuery } from "../../hooks/useMeQuery";

const RESTAURANT_QUERY = gql`
  query restaurant($restaurantInput: RestaurantInput!) {
    Restaurant(input: $restaurantInput) {
      error
      ok
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${DISH_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

const Restaurant = () => {
  const { id } = useParams();
  const meData = useMeQuery();
  const { data, error } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        restaurantInput: {
          restaurantId: +id!,
        },
      },
    }
  );
  const restaurantData = data?.Restaurant.restaurant;
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.Restaurant.error || error) {
      navigate("/error");
    }
  }, [navigate, error, data?.Restaurant.error]);

  const orderCart = useReactiveVar(orderCartVar);
  const [readyToCheckout, setReadyToCheckout] = useState(false);

  return (
    <>
      <Helmet>
        <title>
          {data?.Restaurant.restaurant?.name || "Restaurant"} | Snapsnacks
        </title>
      </Helmet>
      <div className="pt-20">
        <RestaurantHero
          address={restaurantData?.address!}
          categoryName={restaurantData?.category?.name!}
          coverImage={restaurantData?.coverImage!}
          isPromoted={restaurantData?.isPromoted!}
          name={restaurantData?.name!}
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-8">
        <div>
          {restaurantData?.menu.length === 0 ? (
            <h4 className="pt-8 text-center text-xl font-semibold">
              This restaurant's menu has no dishes
            </h4>
          ) : (
            <>
              <div className="flex w-full justify-center">
                {orderCart.length === 0 && (
                  <h3 className="py-3 text-center text-xl font-semibold">
                    Menu
                  </h3>
                )}
                {orderCart.length !== 0 && (
                  <button
                    onClick={() => setReadyToCheckout((prev) => !prev)}
                    className="flex select-none justify-end rounded-md bg-amber-500 py-3 px-5 text-right text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-orange-400 focus:bg-orange-400 active:bg-amber-500"
                  >
                    {readyToCheckout && "To Menu"}
                    {!readyToCheckout && "To Checkout"}
                  </button>
                )}
              </div>
              <div>
                {!readyToCheckout && (
                  <DishList
                    menu={restaurantData?.menu!}
                    role={meData.data?.me.role!}
                    restaurantId={id!}
                    readyToCheckout={readyToCheckout}
                  />
                )}
                {readyToCheckout && (
                  <OrderList
                    menu={restaurantData?.menu}
                    setReadyToCheckout={setReadyToCheckout}
                    restaurantId={id!}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Restaurant;
