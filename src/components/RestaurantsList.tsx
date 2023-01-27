import { Link } from "react-router-dom";
import { category_category } from "../api/types/category";
import { myRestaurants_myRestaurants } from "../api/types/myRestaurants";
import { restaurantsPageQuery_Restaurants } from "../api/types/restaurantsPageQuery";
import { searchRestaurant_searchRestaurant } from "../api/types/searchRestaurant";
import RestaurantCard from "./UI/RestaurantCard";

interface IRestaurantsListProps {
  data:
    | restaurantsPageQuery_Restaurants
    | searchRestaurant_searchRestaurant
    | category_category
    | myRestaurants_myRestaurants;
}

const RestaurantsList: React.FC<IRestaurantsListProps> = ({ data }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-5 gap-y-10 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.restaurants?.map((restaurant) => (
        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
          <RestaurantCard
            categoryName={restaurant.category?.name || "Category Name"}
            name={restaurant.name}
            image={restaurant.coverImage}
            promoted={restaurant.isPromoted}
            id={restaurant.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default RestaurantsList;
