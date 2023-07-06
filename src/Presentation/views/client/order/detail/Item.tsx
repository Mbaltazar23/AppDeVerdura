import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Product } from "../../../../../Domain/entities/Product";
import { Text } from "react-native";

interface Props {
  product: Product;
}

export const OrderDetailItem = ({ product }: Props) => {
  const formattedPrice = product.price.toLocaleString("en-US");
  const totalPrice = (product.quantity! * product.price).toLocaleString("en-US");

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.quantity}>Cantidad: {product.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${formattedPrice} c/u</Text>
        <Text style={styles.total}>${totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  productInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 13,
    marginTop: 5,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    color: "green",
    fontWeight: "bold",
  },
  total: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,

  },
});
