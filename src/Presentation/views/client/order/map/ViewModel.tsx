import * as Location from "expo-location";
import { useEffect, useRef, useState, useContext } from "react";
import MapView, { Camera } from "react-native-maps";
import { Order } from "../../../../../Domain/entities/Order";
import { OrderContext } from "../../../../context/OrderContext";

const ClientOrderMapViewModel = (order: Order) => {
  const [messagePermissions, setMessagePermissions] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [refPoint, setRefPoint] = useState({
    name: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const [origin, setOrigin] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [destination, setDestination] = useState({
    latitude: order.address?.lat!,
    longitude: order.address?.lng!,
  });
  const mapRef = useRef<MapView | null>(null);
  let positionSuscription: Location.LocationSubscription;

  const { updateToDelivered } = useContext(OrderContext);

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted) {
        startForegroundUpdate();
      }
    };

    requestPermissions();
  }, []);

  const updateToDeliveredOrder = async () => {
    const result = await updateToDelivered(order);
    setResponseMessage(result.message);
  };

  const onRegionChangeComplete = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const place = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });
      let city;
      let street;
      let streetNumber;
      place.find((p) => {
        city = p.city;
        street = p.street;
        streetNumber = p.streetNumber;
        setRefPoint({
          name: `${street}, ${streetNumber}, ${city}`,
          latitude: latitude,
          longitude: longitude,
        });
      });
    } catch (error) {
      console.log("Error" + error);
    }
  };

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      setMessagePermissions("Permiso de ubicacion denegado");
      return;
    }
    const location = await Location.getLastKnownPositionAsync(); // UBICACION UNA SOLA VEZ
    setPosition(location?.coords);
    console.log("POSITION : " + JSON.stringify(location?.coords, null, 3));

    setOrigin({
      latitude: location?.coords.latitude!,
      longitude: location?.coords.longitude!,
    });
    const newCamera: Camera = {
      center: {
        latitude: location?.coords.latitude!,
        longitude: location?.coords.longitude!,
      },
      zoom: 15,
      heading: 0,
      pitch: 0,
      altitude: 0,
    };
    mapRef.current?.animateCamera(newCamera, { duration: 2000 });

    positionSuscription?.remove();

    positionSuscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        console.log("POSITION : " + JSON.stringify(location.coords, null, 3));

        setPosition(location!.coords);
      }
    );
  };

  const stopForegroundUpdate = async () => {
    positionSuscription?.remove();
    setPosition(undefined);
  };

  return {
    messagePermissions,
    position,
    mapRef,
    ...refPoint,
    responseMessage,
    origin,
    destination,
    onRegionChangeComplete,
    stopForegroundUpdate,
    updateToDeliveredOrder
  };
};

export default ClientOrderMapViewModel;
