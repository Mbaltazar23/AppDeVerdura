import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";
import { Product } from "../../../../../Domain/entities/Product";
import { Dimensions, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 30;

interface CardProps {
  product: Product;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

export const Card = ({ product, navigation }: CardProps) => {
  const { shoppingBag, saveItem } = useContext(ShoppingBagContext);

  const addToCart = () => {
    const quantity = 1
    const item: Product = { ...product, quantity };
    const index = shoppingBag.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const existingQuantity = shoppingBag[index].quantity || 0;
      const updatedQuantity = existingQuantity + quantity;
      item.quantity = updatedQuantity;
    }
    saveItem(item);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ClientProductDetailScreen", {
          product: product,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>${product.price}</Text>
        <TouchableOpacity onPress={addToCart}>
          <View style={styles.addToCart}>
            <Icon
              name="add"
              size={28}
              style={{ marginRight: 5, color: "white" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    height: 320,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "white",
  },
  imageContainer: {
    height: "60%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    bottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    fontWeight: "bold",
    color: MyColors.primary,
    marginBottom: 0.6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 14,
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  addToCart: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: MyColors.primary,
    marginLeft: 70,
  },
});
