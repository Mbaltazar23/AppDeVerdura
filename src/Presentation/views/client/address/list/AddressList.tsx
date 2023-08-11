import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, ToastAndroid, View } from "react-native";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { AddressListItem } from "./Item";
import { RoundedButton } from "../../../../components/RoundedButton";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientAddressListScreen"> {}

export const ClientAddressListScreen = ({ navigation, route }: Props) => {
  const {
    address,
    checked,
    responseMessage,
    createOrder,
    changeRadioValue,
    loading,
    order,
  } = useViewModel();

  useEffect(() => {
    if (responseMessage != "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    if (order) {
      navigation.navigate("ClientStatusOrderScreen", { order: order });
    }
  }, [order]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={address}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AddressListItem
            address={item}
            checked={checked}
            changeRadioValue={changeRadioValue}
          />
        )}
      />
      <View
        style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}
      >
        <RoundedButton text="CONTINUAR" onPress={() => createOrder()} />
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
