import { useEffect, useState } from "react";
import { useMap, Marker, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine";
import * as L from "leaflet";
import "./MapComponent.css";
import "leaflet-control-geocoder";
import { useSubscription } from "@apollo/client";
import { cookedOrders } from "../../api/types/cookedOrders";
import { COOKED_ORDERS_SUBSCRIPTION } from "../../pages/driver/Dashboard";

export interface ICoordsState {
  latitude: number;
  longitude: number;
}

interface IMapComponentProps {
  cookedOrdersData: cookedOrders | undefined;
}

const driverIcon = L.divIcon({
  iconSize: [40, 40],
  html: "🚗",
  className:
    "text-center flex justify-center items-center w-full h-full text-2xl",
});

const restaurantIcon = L.divIcon({
  iconSize: [40, 40],
  html: "🍔",
  className:
    "text-center flex justify-center items-center w-full h-full text-2xl",
});

const MapComponent: React.FC<IMapComponentProps> = ({ cookedOrdersData }) => {
  const [driverCoords, setDriverCoords] = useState<ICoordsState>({
    latitude: 0,
    longitude: 0,
  });
  const [restaurantCoords, setRestaurantCoords] = useState<ICoordsState>({
    latitude: 0,
    longitude: 0,
  });
  const map = useMap();
  //it is there, no types
  //@ts-ignore
  const geocoder = L.Control.Geocoder.nominatim();

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ latitude, longitude });
    map.setView([latitude, longitude], 15);
  };

  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
    //Only need to display the drivers loc when driver opens a dashboard
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    geocoder.geocode(
      cookedOrdersData?.cookedOrders.restaurant?.address,
      function response(res: any) {
        if (res.length === 0) {
          console.log("Restaurant address was not identified");
        }
        setRestaurantCoords({
          latitude: res[0].center.lat,
          longitude: res[0].center.lng,
        });
      }
    );
  }, [cookedOrdersData]);

  useEffect(() => {
    if (!cookedOrdersData?.cookedOrders) {
      console.log("no data");
      return;
    }
    console.log("initializing");
    // It is there, no types
    // @ts-ignore
    L.Routing.control({
      waypoints: [
        L.latLng(driverCoords.latitude, driverCoords.longitude),
        L.latLng(restaurantCoords.latitude, restaurantCoords.longitude),
      ],
      lineOptions: { styles: [{ color: "blue", weight: 4 }] },
      createMarker: () => {
        return null;
      },
      fitSelectedRoutes: true,
    }).addTo(map);
  }, [driverCoords, restaurantCoords]);

  return (
    <>
      <Marker
        position={[driverCoords.latitude, driverCoords.longitude]}
        icon={driverIcon}
      ></Marker>
      {restaurantCoords.latitude !== 0 && restaurantCoords.longitude !== 0 && (
        <Marker
          position={[restaurantCoords.latitude, restaurantCoords.longitude]}
          icon={restaurantIcon}
        ></Marker>
      )}
    </>
  );
};

export default MapComponent;
