import { useQuery } from "@apollo/client";
import { MY_RESTAURANT_QUERY } from "../pages/owner/MyRestaurant";

export const useMyRestaurantQuery = (restaurantId: string | undefined) => {
  return useQuery(MY_RESTAURANT_QUERY, {
    variables: { myRestaurantInput: { id: +restaurantId! } },
  });
};
