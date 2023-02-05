import { gql, useSubscription } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { MapContainer, TileLayer } from "react-leaflet";
import MapComponent from "../../components/Map/MapComponent";
import { FULL_ORDER_FRAGMENT } from "../../api/fragments";
import { cookedOrders } from "../../api/types/cookedOrders";
import { useNavigate } from "react-router-dom";

export const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const Dashboard = () => {
  const { data } = useSubscription<cookedOrders>(COOKED_ORDERS_SUBSCRIPTION);

  const navigate = useNavigate();

  const acceptOrderHandler = () => {
    navigate(`/${data?.cookedOrders.id}`);
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
      </div>
    </>
  );
};

export default Dashboard;
