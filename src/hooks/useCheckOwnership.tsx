import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MY_RESTAURANT_QUERY } from "../pages/owner/MyRestaurant";

export const useCheckOwnership = (restaurantId: string | undefined) => {
  const { data, error } = useQuery(MY_RESTAURANT_QUERY, {
    variables: { myRestaurantInput: { id: +restaurantId! } },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.myRestaurant.error || error) {
      navigate("/error");
    }
  }, [data?.myRestaurant.error, navigate, error]);
  return data;
};
