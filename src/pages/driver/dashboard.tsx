/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { cookedOrders } from "../../__generated__/cookedOrders";
import { Link, useHistory } from "react-router-dom";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => (
  <div className="h-10 w-10 bg-indigo-600 rounded-full flex justify-center item-center text-3xl">
    🏍
  </div>
);

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (results, status) => {
          console.log(results, status);
        }
      );
    }
  }, [driverCoords.lat, driverCoords.lng]);

  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.005,
              driverCoords.lng + 0.002
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  const { data: cookedOrderDatas } = useSubscription<cookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );

  useEffect(() => {
    if (cookedOrderDatas?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrderDatas]);
  const history = useHistory();
  const onCompleted = (data:takeOrder) => {
      if(data.takeOrder.ok) {
          history.push(`/orders/${cookedOrderDatas?.cookedOrders.id}`)
      }
  }

  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION, {
        onCompleted
    }
  );
  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="bg-indigo-600 overflow-hidden"
        style={{ width: "77vw", height: "60vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          bootstrapURLKeys={{ key: "AIzaSyCZt8h5l75SvRB0ECWT4QggivndWBbPiUA" }}
          defaultCenter={{
            lat: 37.4354373,
            lng: 126.8300845,
          }}
          defaultZoom={17}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
      {cookedOrderDatas?.cookedOrders && (
        <div className="max-w-screen-md lg:w-4/12 mx-auto bg-white relative -top-10 shadow-lg p-10">
          <h1 className="text-indigo-600 font-semibold text-center text-xl mb-3">
            새로운 배달 요청입니다!
          </h1>
          <h4 className="text-sm mb-3">위치를 확인하고 요청을 수락해주세요.</h4>
          <h4 className="text-sm text-gray-500">
            {cookedOrderDatas?.cookedOrders.restaurant?.name}
          </h4>
          <h4 className="text-sm text-gray-500">
            {cookedOrderDatas?.cookedOrders.restaurant?.address}
          </h4>
          <button
            onClick={() => triggerMutation(cookedOrderDatas.cookedOrders.id)}
            className="bg-indigo-600 text-white w-full mt-3 py-1 hover:bg-indigo-500 transition-colors block text-center"
          >
            수락
          </button>
        </div>
      )}
    </div>
  );
};
