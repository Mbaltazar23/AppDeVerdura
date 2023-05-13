import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { RoundedButton } from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressCreateScreen"> {}

export const ClientAddressCreateScreen = ({ navigation, route }: Props) => {
  const {
    address,
    neighborhood,
    onChange,
    onChangeRefPoint,
    responseMessage,
    loading,
    refPoint,
    createAddress,
  } = useViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {   

    if (route.params?.refPoint) {
      onChangeRefPoint(route.params?.refPoint, route.params?.latitude, route.params?.longitude);
    }
  }, [route.params?.refPoint]);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("../../../../../../assets/map.png")}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la Direccion"
          keyboardType="default"
          image={require("../../../../../../assets/location.png")}
          property="address"
          onChangeText={onChange}
          value={address}
        />
        <CustomTextInput
          placeholder="Barrio"
          keyboardType="default"
          image={require("../../../../../../assets/neighborhood.png")}
          property="neighborhood"
          onChangeText={onChange}
          value={neighborhood}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("ClientAddressMapScreen")}
        >
          <CustomTextInput
            placeholder="Punto de referencia"
            keyboardType="default"
            image={require("../../../../../../assets/ref_point.png")}
            property="refPoint"
            onChangeText={onChange}
            value={refPoint}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton text="CREAR DIRECCION" onPress={() => createAddress()} />
      </View>

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
