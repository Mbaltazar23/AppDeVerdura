import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, ToastAndroid, View } from "react-native";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { AddressListItem } from "./Item";
import { RoundedButton } from "../../../../components/RoundedButton";
import useViewModel from "./ViewModel";

export const ClientAddressListScreen = () => {
  const { address, checked, responseMessage, createOrder, changeRadioValue,loading } =
    useViewModel();

  useEffect(() => {
    if (responseMessage != "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

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
      <View style={{ width: "100%", paddingHorizontal: 20 , paddingVertical:20}}>
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
