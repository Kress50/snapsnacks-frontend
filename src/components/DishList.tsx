import { myRestaurant_myRestaurant_restaurant_menu } from "../api/types/myRestaurant";
import DishCard from "./UI/DishCard";

interface IDishListProps {
  menu?: myRestaurant_myRestaurant_restaurant_menu[];
}

const DishList: React.FC<IDishListProps> = ({ menu }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 gap-y-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {menu?.map((dish) => (
        <DishCard
          coverImage={dish.coverImage!}
          name={dish.name!}
          description={dish.description!}
          price={dish.price!}
        />
      ))}
    </div>
  );
};

export default DishList;
