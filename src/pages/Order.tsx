import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { FULL_ORDER_FRAGMENT } from "../api/fragments";
import { editOrder, editOrderVariables } from "../api/types/editOrder";
import { getOrder, getOrderVariables } from "../api/types/getOrder";
import { OrderStatus, UserRole } from "../api/types/globalTypes";
import { orderUpdates } from "../api/types/orderUpdates";
import { Button } from "../components/UI/Button";
import { useMeQuery } from "../hooks/useMeQuery";

const GET_ORDER = gql`
  query getOrder($getOrderInput: GetOrderInput!) {
    getOrder(input: $getOrderInput) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($orderUpdatesInput: OrderUpdatesInput!) {
    orderUpdates(input: $orderUpdatesInput) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const EDIT_ORDER_MUTATION = gql`
  mutation editOrder($editOrderInput: EditOrderInput!) {
    editOrder(input: $editOrderInput) {
      ok
      error
    }
  }
`;

const Order = () => {
  const params = useParams();
  const [genericError, setGenericError] = useState(false);
  const { data: userData } = useMeQuery();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(
    EDIT_ORDER_MUTATION
  );
  const { data, error, subscribeToMore } = useQuery<
    getOrder,
    getOrderVariables
  >(GET_ORDER, {
    variables: { getOrderInput: { id: +params.id! } },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (data?.getOrder.error || error) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }

    //Subscription data
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: { orderUpdatesInput: { id: +params.id! } },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdates } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [error, navigate, data, params.id, subscribeToMore]);

  const changeOrderStatusHandler = async (newStatus: OrderStatus) => {
    try {
      setGenericError(false);
      await editOrderMutation({
        variables: { editOrderInput: { id: +params.id!, status: newStatus } },
      });
    } catch (e) {
      setGenericError(true);
      console.log(e);
    }
  };

  return (
    <>
      {(error || data?.getOrder.error) && (
        <>
          <Helmet>
            <title>Order Error | SnapSnacks</title>
          </Helmet>
          <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
            <span>
              The order you're trying to access either doesn't exist or you
              don't have the rights to see it
            </span>
            <span className="text-sm">
              Wait 5 seconds or click on the button to return to restaurants
              list:
            </span>
            <Button
              actionText="Return Back"
              canClick={true}
              loading={false}
              link={"/"}
            />
          </div>
        </>
      )}
      <>
        <Helmet>
          <title>Order #{params.id} | SnapSnacks</title>
        </Helmet>
        <div className="flex h-screen items-center justify-center">
          <div className="w-full max-w-sm rounded-lg border-2 border-slate-800">
            <h4 className="w-full bg-slate-800 py-5 text-center text-xl text-white">
              Order #{params.id}
            </h4>
            <h5 className="p-5 text-center text-2xl font-semibold">
              ${data?.getOrder.order?.total}
            </h5>
            <div className="mx-5 border-t-2 py-5 text-lg">
              <span className="font-semibold">Prepared By: </span>
              <span>{data?.getOrder.order?.restaurant?.name}</span>
            </div>
            <div className="mx-5 border-t-2 py-5 text-lg">
              <span className="font-semibold">Deliver To: </span>
              <span>{data?.getOrder.order?.customer.email}</span>
            </div>
            <div className="mx-5 border-t-2 py-5 text-lg">
              <span className="font-semibold">Driver: </span>
              <span>
                {data?.getOrder.order?.driver?.email || "Not assigned"}
              </span>
            </div>
            {userData?.me.role === UserRole.Client && (
              <h6
                className={`mx-5 border-t-2 py-10 text-center text-xl font-semibold ${
                  data?.getOrder.order?.status === "Delivered"
                    ? "border-green-500 text-green-500"
                    : "border-amber-500 text-amber-500"
                }`}
              >
                Status: {data?.getOrder.order?.status}
              </h6>
            )}
            {userData?.me.role === UserRole.Owner && (
              <div className="mx-5 flex flex-col justify-center border-t-2 py-7">
                {data?.getOrder.order?.status === OrderStatus.Pending && (
                  <button
                    onClick={() => {
                      changeOrderStatusHandler(OrderStatus.Cooking);
                    }}
                    className="select-none rounded-md bg-amber-500 py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-orange-400 active:scale-95"
                  >
                    Accept Order
                  </button>
                )}
                {data?.getOrder.order?.status === OrderStatus.Cooking && (
                  <button
                    onClick={() => {
                      changeOrderStatusHandler(OrderStatus.Waiting);
                    }}
                    className="select-none rounded-md bg-amber-500 py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-orange-400 active:scale-95"
                  >
                    Waiting for Delivery
                  </button>
                )}
                {data?.getOrder.order?.status !==
                  (OrderStatus.Pending || OrderStatus.Cooking) && (
                  <h6
                    className={`pt-2 text-center text-xl font-semibold ${
                      data?.getOrder.order?.status === OrderStatus.Delivered
                        ? "text-green-500"
                        : "text-amber-500"
                    }`}
                  >
                    Status: {data?.getOrder.order?.status}
                  </h6>
                )}
                {genericError && (
                  <span className="pt-1 text-center text-red-500">
                    Something went wrong! Try again!
                  </span>
                )}
              </div>
            )}
            {userData?.me.role === UserRole.Delivery && (
              <div className="mx-5 flex flex-col justify-center border-t-2 py-7">
                {data?.getOrder.order?.status === OrderStatus.Waiting && (
                  <button
                    onClick={() => {
                      changeOrderStatusHandler(OrderStatus.PickedUp);
                    }}
                    className="select-none rounded-md bg-amber-500 py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-orange-400 active:scale-95"
                  >
                    Pick up Order
                  </button>
                )}
                {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                  <button
                    onClick={() => {
                      changeOrderStatusHandler(OrderStatus.Delivered);
                    }}
                    className="select-none rounded-md bg-green-500 py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-green-400 active:scale-95"
                  >
                    Delivery Finished
                  </button>
                )}
                {data?.getOrder.order?.status !==
                  (OrderStatus.Pending || OrderStatus.Cooking) && (
                  <h6
                    className={`pt-2 text-center text-xl font-semibold ${
                      data?.getOrder.order?.status === OrderStatus.Delivered
                        ? "text-green-500"
                        : "text-amber-500"
                    }`}
                  >
                    Status: {data?.getOrder.order?.status}
                  </h6>
                )}
                {genericError && (
                  <span className="pt-1 text-center text-red-500">
                    Something went wrong! Try again!
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Order;
