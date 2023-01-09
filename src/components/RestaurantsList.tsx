import { category_category } from "../api/types/category";
import { restaurantsPageQuery_Restaurants } from "../api/types/restaurantsPageQuery";
import { searchRestaurant_searchRestaurant } from "../api/types/searchRestaurant";
import RestaurantCard from "./UI/RestaurantCard";

interface IRestaurantsListProps {
  data?:
    | restaurantsPageQuery_Restaurants
    | searchRestaurant_searchRestaurant
    | category_category;
}

const RestaurantsList: React.FC<IRestaurantsListProps> = ({ data }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {data?.restaurants?.map((restaurant) => (
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
