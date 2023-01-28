import { gql, useMutation, useReactiveVar } from "@apollo/client";
import _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateOrder, CreateOrderVariables } from "../api/types/CreateOrder";
import { restaurant_Restaurant_restaurant_menu } from "../api/types/restaurant";
import { orderCartVar } from "../apollo";
import OrderItem from "./UI/OrderItem";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(input: $createOrderInput) {
      ok
      error
      orderId
    }
  }
`;

interface IOrderListProps {
  setReadyToCheckout: React.Dispatch<React.SetStateAction<boolean>>;
  restaurantId: string;
  menu: restaurant_Restaurant_restaurant_menu[] | undefined;
}

const OrderList: React.FC<IOrderListProps> = ({
  setReadyToCheckout,
  restaurantId,
  menu,
}) => {
  let orderCart = useReactiveVar(orderCartVar);
  const [uploading, setUploading] = useState(false);
  const [genericError, setGenericError] = useState(false);
  const navigate = useNavigate();

  const onCompleted = (data: CreateOrder) => {
    const {
      createOrder: { ok, error, orderId },
    } = data;
    if (ok && orderId) {
      setUploading(false);
      orderCartVar([]);
      setReadyToCheckout(false);
      alert("Order created!");
      navigate(`/orders/${orderId}`);
    } else {
      setGenericError(true);
      console.log(error);
    }
  };

  const [createOrderMutation] = useMutation<CreateOrder, CreateOrderVariables>(
    CREATE_ORDER_MUTATION,
    {
      onCompleted,
    }
  );

  let total = 0;
  // eslint-disable-next-line array-callback-return
  orderCart.map((order) => {
    const item = _.filter(menu, { id: order.dishId });

    //the only check for options that matters
    if (order.options?.length !== 0) {
      // eslint-disable-next-line array-callback-return
      order.options?.map((option) => {
        for (let i = 0; i < item[0].options?.length!; i++) {
          //@ts-ignore
          if (item[0].options[i].name === option.name) {
            //@ts-ignore
            total += item[0].options[i].extra;
          }
        }
      });
    }
    total += item[0].price;
  });

  const removeFromOrderHandler = (cartIndex: number) => {
    const filtered = orderCart.filter((_, index) => index !== cartIndex);
    orderCartVar(filtered);
    //hacky way without using useState
    if (orderCart.length === 1) setReadyToCheckout(false);
  };

  const clearOrderHandler = () => {
    setGenericError(false);
    orderCartVar([]);
    setReadyToCheckout(false);
  };

  const createOrderHandler = async () => {
    try {
      setGenericError(false);
      setUploading(true);
      await createOrderMutation({
        variables: {
          createOrderInput: {
            restaurantId: +restaurantId,
            items: orderCart,
          },
        },
      });
    } catch (e) {
      setUploading(false);
      setGenericError(true);
      console.log(e);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center py-20 ${
        uploading && "pointer-events-none saturate-50"
      }`}
    >
      <div className="mx-auto flex w-full flex-col justify-center gap-4 pt-4 lg:w-4/5">
        {orderCart.map((order, cartIndex) => (
          <OrderItem
            key={cartIndex}
            order={order}
            menu={menu}
            removeFromOrderHandler={removeFromOrderHandler}
            cartIndex={cartIndex}
          />
        ))}
      </div>
      <span className="flex justify-end pt-20 text-xl font-bold">
        {" "}
        TOTAL: ${total}
      </span>
      {genericError && (
        <span className="w-full text-center text-xl font-semibold text-red-500">
          Something went wrong, try again!
        </span>
      )}
      <div className="flex justify-end gap-5 pt-10">
        <span
          onClick={clearOrderHandler}
          className="flex w-fit select-none justify-end rounded-md bg-red-500 py-3 px-5 pb-3 text-center text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-red-400 focus:bg-red-400 active:bg-red-500"
        >
          Clear Order
        </span>
        <span
          onClick={createOrderHandler}
          className="flex w-fit select-none justify-end rounded-md bg-green-500 py-3 px-5 pb-3 text-center text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-green-400 focus:bg-green-400 active:bg-green-500"
        >
          {uploading && "Processing..."}
          {!uploading && "Confirm Order"}
        </span>
      </div>
    </div>
  );
};

export default OrderList;
