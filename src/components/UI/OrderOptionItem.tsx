import { OrderItemOptionInputType } from "../../api/types/globalTypes";
import _ from "lodash";
import { restaurant_Restaurant_restaurant_menu } from "../../api/types/restaurant";

interface IOrderItemProps {
  item: restaurant_Restaurant_restaurant_menu;
  option: OrderItemOptionInputType;
}

const OrderOptionItem: React.FC<IOrderItemProps> = ({ item, option }) => {
  const orderOption = _.filter(item.options, { name: option.name });
  return (
    <ul className="flex w-full justify-between gap-2 border-b border-dotted border-gray-300 text-sm">
      <li className="font-light">{orderOption[0].name}</li>
      <li className="font-semibold">${orderOption[0].extra}</li>
    </ul>
  );
};

export default OrderOptionItem;
