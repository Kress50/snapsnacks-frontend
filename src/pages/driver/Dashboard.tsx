import { gql, useMutation, useSubscription } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { MapContainer, TileLayer } from "react-leaflet";
import MapComponent from "../../components/Map/MapComponent";
import { FULL_ORDER_FRAGMENT } from "../../api/fragments";
import { cookedOrders } from "../../api/types/cookedOrders";
import { takeOrder, takeOrderVariables } from "../../api/types/takeOrder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($takeOrderInput: TakeOrderInput!) {
    takeOrder(input: $takeOrderInput) {
      ok
      error
    }
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const onCompleted = (takeOrderData: takeOrder) => {
    if (takeOrderData.takeOrder.ok) {
      setGenericUploadError(false);
      navigate(`/orders/${data?.cookedOrders.id}`);
    }
    if (takeOrderData.takeOrder.error) {
      console.log(takeOrderData.takeOrder.error);
      setGenericUploadError(true);
    }
  };

  const { data } = useSubscription<cookedOrders>(COOKED_ORDERS_SUBSCRIPTION);
  const [genericUploadError, setGenericUploadError] = useState(false);
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    { onCompleted }
  );

  const acceptOrderHandler = async () => {
    try {
      setGenericUploadError(false);
      if (data?.cookedOrders.id) {
        await takeOrderMutation({
          variables: { takeOrderInput: { id: data.cookedOrders.id } },
        });
      }
    } catch (e) {
      console.log(e);
      setGenericUploadError(true);
    }
  };

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          crossOrigin=""
        ></script>
        <title>Dashboard | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">
        <div id="map">
          <MapContainer
            center={[0, 0]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ width: window.innerWidth, height: "60vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapComponent cookedOrdersData={data} />
          </MapContainer>
        </div>
        <div
          className={`mx-auto mt-5 flex w-full max-w-sm flex-col justify-center gap-4 rounded-md border-b-2 border-t-2 p-4 text-center ${
            data?.cookedOrders && "border-amber-500"
          }`}
        >
          {!data?.cookedOrders && (
            <h1 className="text-2xl font-semibold">Waiting for Orders...</h1>
          )}
          {data?.cookedOrders && (
            <>
              <h1 className="text-2xl font-semibold">New Order!</h1>
              <h3 className="text-sm font-light">
                From{" "}
                <span className="font-semibold">
                  {data.cookedOrders.restaurant?.name}
                </span>
              </h3>
              <button
                onClick={acceptOrderHandler}
                className="select-none rounded-md bg-amber-500 py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors hover:bg-orange-400 focus:bg-orange-400 active:bg-amber-500"
              >
                Accept Order
              </button>
            </>
          )}
        </div>
        {genericUploadError && (
          <h4 className="pt-2 text-center font-semibold text-red-500">
            Something went wrong... Try again.
          </h4>
        )}
      </div>
    </>
  );
};

export default Dashboard;
