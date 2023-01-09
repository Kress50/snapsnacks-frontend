import { restaurantsPageQuery } from "../api/types/restaurantsPageQuery";
import RestaurantCard from "./UI/RestaurantCard";

interface IRestaurantsListProps {
  data?: restaurantsPageQuery;
}

const RestaurantsList: React.FC<IRestaurantsListProps> = ({ data }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {data?.Restaurants.restaurants?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          categoryName={restaurant.category?.name}
          name={restaurant.name}
          image={restaurant.coverImage}
          id={restaurant.id}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
