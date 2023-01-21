import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import {
  Data,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { VictoryChart } from "victory-chart";
import {
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../api/fragments";
import {
  deleteRestaurant,
  deleteRestaurantVariables,
} from "../../api/types/deleteRestaurant";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../api/types/myRestaurant";
import DishList from "../../components/DishList";
import RestaurantHero from "../../components/RestaurantHero";
import { Button } from "../../components/UI/Button";
import { useMeQuery } from "../../hooks/useMeQuery";
import { MY_RESTAURANTS_QUERY } from "./MyRestaurants";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const DELETE_RESTAURANT_MUTATION = gql`
  mutation deleteRestaurant($deleteRestaurantInput: DeleteRestaurantInput!) {
    deleteRestaurant(input: $deleteRestaurantInput) {
      ok
      error
    }
  }
`;

const MyRestaurant = () => {
  const { id } = useParams<{ id: string }>();
  const meData = useMeQuery();
  const navigate = useNavigate();
  const { data, error } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    { variables: { myRestaurantInput: { id: +id! } } }
  );
  const onCompleted = (data: deleteRestaurant) => {
    const {
      deleteRestaurant: { ok, error },
    } = data;
    if (ok) {
      navigate("/");
    } else {
      alert("Could not delete restaurant, see console.log and try again!");
      console.log(error);
    }
  };
  const [deleteRestaurantMutation] = useMutation<
    deleteRestaurant,
    deleteRestaurantVariables
  >(DELETE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: MY_RESTAURANTS_QUERY,
      },
    ],
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (data?.myRestaurant.error || error) {
      navigate("/error");
    }
  }, [data?.myRestaurant.error, navigate, error]);

  const restaurantData = data?.myRestaurant.restaurant;

  const deleteRestaurantHandler = async (id: string) => {
    try {
      await deleteRestaurantMutation({
        variables: { deleteRestaurantInput: { restaurantId: +id } },
      });
    } catch (e) {
      alert("Could not delete restaurant, see console.log and try again!");
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || `My Restaurant`} | SnapSnacks
        </title>
      </Helmet>
      <div className="pt-20">
        <RestaurantHero
          address={restaurantData?.address}
          categoryName={restaurantData?.category?.name}
          coverImage={restaurantData?.coverImage}
          isPromoted={restaurantData?.isPromoted}
          name={restaurantData?.name}
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-8">
          <h2 className="text-3xl font-bold">
            {data?.myRestaurant.restaurant?.name || `My Restaurant`} Dashboard
          </h2>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="flex flex-col gap-4 md:flex-row">
              <Button
                actionText="Edit Restaurant"
                loading={false}
                canClick={true}
                link={`/restaurant/${id}/edit-restaurant`}
              />
              <Button
                actionText="Add Dish"
                loading={false}
                canClick={true}
                link={`/restaurant/${id}/add-dish`}
              />
              <Button
                actionText="Buy Promotion"
                loading={false}
                canClick={true}
              />
            </div>
            <div className="flex flex-col md:w-56">
              <button
                onClick={() => {
                  setConfirmDelete(true);
                }}
                className={`w-full select-none rounded-md py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors ${
                  !confirmDelete
                    ? "bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-500"
                    : "pointer-events-none bg-gray-300"
                }`}
              >
                Delete Restaurant
              </button>
              {confirmDelete && (
                <div className="pt-1">
                  <h4 className="text-md pb-1 text-center">
                    Are you sure you want to delete the restaurant?
                  </h4>
                  <div className="flex flex-row gap-6">
                    <button
                      onClick={() => {
                        deleteRestaurantHandler(id!);
                      }}
                      className="w-2/3 select-none rounded-md bg-red-500 py-2 px-2 text-sm font-normal text-white shadow-sm outline-none transition-colors hover:bg-red-700 focus:bg-red-700 active:bg-red-500"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => {
                        setConfirmDelete(false);
                      }}
                      className="w-2/3 select-none rounded-md bg-amber-500 py-3 px-2 text-sm font-normal text-white shadow-sm outline-none transition-colors hover:bg-orange-400 focus:bg-orange-400 active:bg-amber-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-t-2">
            {restaurantData?.menu.length === 0 ? (
              <h4 className="pt-8 text-center text-xl font-semibold">
                Your menu has no dishes
              </h4>
            ) : (
              <DishList
                menu={restaurantData?.menu}
                role={meData.data?.me.role}
                restaurantId={id}
              />
            )}
          </div>
          <div className="border-t-2 pb-8">
            <h4 className="pt-2 text-center text-2xl font-semibold">Sales</h4>
            <div className="w-full ">
              <VictoryChart
                height={500}
                domainPadding={50}
                width={window.innerWidth}
                theme={VictoryTheme.material}
                containerComponent={<VictoryVoronoiContainer />}
              >
                <VictoryLine
                  labels={({ datum }) => `$${datum.y}`}
                  labelComponent={
                    <VictoryLabel
                      style={{ fontSize: 20 }}
                      renderInPortal
                      dy={-20}
                    />
                  }
                  data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                    x: order.createdAt,
                    y: order.total,
                  }))}
                  style={{ data: { strokeWidth: 5, stroke: "#f39c0c" } }}
                />
                <VictoryAxis
                  tickFormat={(tick) => new Date(tick).toLocaleDateString()}
                  style={{ tickLabels: { fontSize: 20 } }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRestaurant;
