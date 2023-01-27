import { useReactiveVar } from "@apollo/client";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  OrderItemOptionInputType,
  UserRole,
} from "../../api/types/globalTypes";
import { myRestaurant_myRestaurant_restaurant_menu_options } from "../../api/types/myRestaurant";
import { orderCartVar } from "../../apollo";
import _ from "lodash";

interface IDishProps {
  description: string;
  name: string;
  price: number;
  coverImage: string;
  role: UserRole;
  options?: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
  id: number;
}

const DishCard: React.FC<IDishProps> = ({
  description,
  name,
  price,
  coverImage,
  role,
  options,
  id,
}) => {
  const orderCart = useReactiveVar(orderCartVar);
  const counter = orderCart.filter((order) => order.dishId === id).length;
  const [selectedOptions, setSelectedOptions] = useState(
    [] as OrderItemOptionInputType[]
  );

  const handleAddToOrderCounter = () => {
    if (role !== "Client") return;
    orderCartVar([
      ...orderCartVar(),
      { dishId: id, options: selectedOptions },
    ]).sort((a, b) => b.options?.length! - a.options?.length!);
    setSelectedOptions([]);
  };

  const handleSelectedOptions = (optionName: string) => {
    if (role !== "Client") return;
    setSelectedOptions((prev) => [...prev, { name: optionName }]);
  };

  return (
    <div className="group flex w-full flex-col">
      <div className="z-10 flex h-52 w-full select-none flex-col justify-between border-2 bg-white pr-2 shadow-sm transition-all group-hover:border-amber-500">
        <div className="flex h-28 w-full justify-between">
          {role === "Client" && counter !== 0 && (
            <div className="absolute z-10 flex h-7 w-7 items-center justify-center rounded-br-xl bg-amber-500 font-semibold text-white transition-all">
              {counter}
            </div>
          )}
          <div
            style={{ backgroundImage: `url(${coverImage})` }}
            className="bg-cover bg-center py-10 px-14"
          ></div>
          <div className="flex w-full flex-col justify-between px-2 pt-2 text-right">
            <div className="flex flex-col">
              <h3 className="font-bold">{name}</h3>
              <h4 className="text-sm">{description}</h4>
            </div>
            <div className="flex flex-col">
              <div className="font-bold">{price}$</div>
            </div>
          </div>
        </div>
        <span className="py-1 text-center text-sm">Options:</span>
        {options?.length === 0 && (
          <span className="flex w-full items-center justify-center px-2 py-2 text-center text-base font-light">
            This dish has no additional options
          </span>
        )}
        <div className="my-auto grid w-full grid-cols-2 grid-rows-2 gap-2 px-2 text-sm">
          {options?.map((option, index) => (
            <div
              key={`option-${index}`}
              className={`flex justify-between border-b-2 border-dotted border-amber-500 hover:border-double active:scale-95 ${
                _.findIndex(selectedOptions, { name: option.name }) !== -1 &&
                "pointer-events-none border-gray-500 text-gray-500"
              }
              )}`}
              onClick={() => handleSelectedOptions(option.name)}
            >
              <span>{option.name}</span>
              <span>${option.extra}</span>
            </div>
          ))}
        </div>
      </div>
      {role === "Client" && (
        <FontAwesomeIcon
          icon={faCartShopping}
          onClick={() => handleAddToOrderCounter()}
          className="-translate-y-10 cursor-pointer rounded-b-md bg-amber-500 p-2 text-lg text-white transition-all group-hover:translate-y-0"
        />
      )}
    </div>
  );
};

export default DishCard;
