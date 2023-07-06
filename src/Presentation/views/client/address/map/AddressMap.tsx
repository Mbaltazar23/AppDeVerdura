import React, { useEffect } from "react";
import { View, Text, ToastAndroid, Image, TextInput } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { RoundedButton } from "../../../../components/RoundedButton";
import useViewModel from "./ViewModel";
import stylesMap from "./StylesMap";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressMapScreen"> {}

export const ClientAddressMapScreen = ({ navigation, route }: Props) => {
  const {
    messagePermissions,
    position,
    mapRef,
    name,
    latitude,
    longitude,
    onRegionChangeComplete,
    addressInput,
    setAddressInput,
    validateAndRedirect,
  } = useViewModel();

  useEffect(() => {
    if (messagePermissions !== "") {
      ToastAndroid.show(messagePermissions, ToastAndroid.LONG);
    }
  }, [messagePermissions]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={stylesMap}
        style={{ flex: 1, width: "100%" }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={(region) => {
          onRegionChangeComplete(region.latitude, region.longitude);
        }}
      />

      <Image
        style={styles.imageLocation}
        source={require("../../../../../../assets/location_home.png")}
      />

      <View style={styles.refPoint}>
        <Text style={styles.refPointText}>{name}</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese una dirección"
            value={addressInput}
            onChangeText={setAddressInput}
            onSubmitEditing={validateAndRedirect}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <RoundedButton text="Buscar" onPress={validateAndRedirect} />
        </View>
      </View>

      <View style={styles.buttonRefPoint}>
        <RoundedButton
          text="SELECCIONAR PUNTO"
          onPress={() =>
            navigation.navigate({
              name: "ClientAddressCreateScreen",
              merge: true,
              params: {
                refPoint: name,
                latitude: latitude,
                longitude: longitude,
              },
            })
          }
        />
      </View>
    </View>
  );
};
