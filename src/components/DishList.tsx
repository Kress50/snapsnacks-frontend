import { gql, useMutation } from "@apollo/client";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDish, deleteDishVariables } from "../api/types/deleteDish";
import { UserRole } from "../api/types/globalTypes";
import { myRestaurant_myRestaurant_restaurant_menu } from "../api/types/myRestaurant";
import { MY_RESTAURANT_QUERY } from "../pages/owner/MyRestaurant";
import DishCard from "./UI/DishCard";

interface IDishListProps {
  menu: myRestaurant_myRestaurant_restaurant_menu[];
  role: UserRole;
  restaurantId: string;
  readyToCheckout?: boolean;
  orderItemsHandler?: any;
}

const DELETE_DISH_MUTATION = gql`
  mutation deleteDish($deleteDishInput: DeleteDishInput!) {
    deleteDish(input: $deleteDishInput) {
      error
      ok
    }
  }
`;

const DishList: React.FC<IDishListProps> = ({
  menu,
  role,
  restaurantId,
  readyToCheckout,
  orderItemsHandler,
}) => {
  const [deleteDishMutation] = useMutation<deleteDish, deleteDishVariables>(
    DELETE_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: { myRestaurantInput: { id: +restaurantId! } },
        },
      ],
    }
  );
  const onClickDeleteDishHandler = async (id: number) => {
    try {
      await deleteDishMutation({
        variables: { deleteDishInput: { dishId: id } },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`mx-auto grid max-w-7xl grid-cols-1 gap-x-4 gap-y-5 pb-10 pt-10 sm:grid-cols-2 lg:grid-cols-3 ${
        readyToCheckout && "hidden"
      }`}
    >
      {menu?.map((dish) => (
        <div key={dish.id} className="group">
          {role === "Owner" && (
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => {
                onClickDeleteDishHandler(dish.id!);
              }}
              className="absolute cursor-pointer rounded-sm p-2 text-2xl text-transparent shadow-sm transition-all active:scale-95 active:text-red-600 group-hover:bg-white group-hover:text-red-500"
            />
          )}
          <DishCard
            coverImage={dish.coverImage!}
            name={dish.name!}
            description={dish.description!}
            price={dish.price!}
            role={role}
            options={dish.options}
            id={dish.id}
          />
        </div>
      ))}
    </div>
  );
};

export default DishList;
