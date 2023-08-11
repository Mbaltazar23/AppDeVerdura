import React, { useEffect, useRef, useState } from "react";
import MapView, { Camera, LatLng } from "react-native-maps";
import * as Location from "expo-location";

const ClientAddressMapViewModel = () => {
  const [messagePermissions, setMessagePermissions] = useState("");
  const [refPoint, setRefPoint] = useState({
    name: "",
    latitude: 0.0,
    longitude: 0.0,
  });
  const [position, setPosition] = useState<Location.LocationObjectCoords>();
  const mapRef = useRef<MapView | null>(null);
  const [addressInput, setAddressInput] = useState("");

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted) {
        startForegroundUpdate();
      }
    };

    requestPermissions();
  }, []);

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
      console.log("Error: " + error);
    }
  };

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      setMessagePermissions("Permiso de ubicación denegado");
      return;
    }

    const location = await Location.getLastKnownPositionAsync();

    setPosition(location?.coords);

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
  };

  const geocodeAddress = async (address: string) => {
    try {
      const formattedAddress = address.replace(/\w\S*/g, (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1));

      // Agregar coma después de las letras y antes del número
      const formattedAddressWithComma = formattedAddress.replace(/^([A-Za-zñÑ\s]+)(\d+)/, "$1, $2");
  
      // Agregar "Arica" después del número con una coma previa
      const formattedAddressWithCity = `${formattedAddressWithComma}, Arica`;
  
      const geocode = await Location.geocodeAsync(formattedAddressWithCity);
  
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
  
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
       
      } else {
        console.log("No se encontraron resultados para la dirección ingresada.");
      }
    } catch (error) {
      console.log("Error al geocodificar la dirección:", error);
    }
  };

  const validateAndRedirect = () => {
    if (addressInput.trim() === "") {
      setMessagePermissions("Ingresa una dirección válida.");
      return;
    }

    geocodeAddress(addressInput);
  };

  return {
    messagePermissions,
    position,
    mapRef,
    ...refPoint,
    onRegionChangeComplete,
    addressInput,
    setAddressInput,
    validateAndRedirect,
  };
};

export default ClientAddressMapViewModel;
