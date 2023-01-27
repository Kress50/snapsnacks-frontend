import React from "react";
import { CreateOrderItemInput } from "../../api/types/globalTypes";
import { restaurant_Restaurant_restaurant_menu } from "../../api/types/restaurant";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import OrderOptionItem from "./OrderOptionItem";

interface IOrderItemProps {
  order: CreateOrderItemInput;
  menu: restaurant_Restaurant_restaurant_menu[] | undefined;
  cartIndex: number;
  removeFromOrderHandler: (cartIndex: number) => void;
}

const OrderItem: React.FC<IOrderItemProps> = ({
  order,
  menu,
  cartIndex,
  removeFromOrderHandler,
}) => {
  const item = _.filter(menu, { id: order.dishId });
  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="flex w-full justify-between border-b-2 border-dotted border-b-gray-500 text-xl">
          <p>{item[0].name}</p>
          <p className="font-bold">${item[0].price}</p>
        </div>
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => removeFromOrderHandler(cartIndex)}
          className="cursor-pointer rounded-md bg-red-500 p-2 text-lg text-white hover:bg-red-600 active:scale-95"
        />
      </div>
      {order.options?.length! > 0 && (
        <div className="flex w-full flex-col justify-start gap-2 sm:gap-4">
          <span className="font-light">With these options:</span>
          {order.options?.map((option, optionIndex) => (
            <OrderOptionItem key={optionIndex} item={item[0]} option={option} />
          ))}
        </div>
      )}
    </>
  );
};

export default OrderItem;
