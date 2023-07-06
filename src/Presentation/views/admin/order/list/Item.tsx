import React from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { DateFormater } from "../../../../utils/DateFormater";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";

interface Props {
  order: Order;
  navigation: StackNavigationProp<
    AdminOrderStackParamList,
    "AdminOrderListScreen",
    undefined
  >;
}

export const OrderListItem = ({ order, navigation }: Props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdminOrderDetailScreen", { order: order })
      }
    >
      <View style={styles.container}>
        <Text style={styles.order}>Orden # {order.id}</Text>
        <Text style={{ ...styles.info, marginTop: 10 }}>
          <Text style={styles.textColor}>Fecha del pedido:</Text>{" "}
          {DateFormater(order.timestamp!)}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.textColor}>Cliente: </Text>
          {order.client?.name} {order.client?.lastname}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.textColor}>Direccion:</Text>{" "}
          {order.address?.address}{" "}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.textColor}>Barrio:</Text>{" "}
          {order.address?.neighborhood}
        </Text>
        <View style={styles.divider}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop:4
  },
  order: {
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    marginTop: 10,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2",
    marginTop: 10,
  },
  info: {
    fontSize: 13,
  },
  textColor: {
    fontWeight: "bold",
    color: "black",
    fontSize: 12,
  },
});
