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
const cardWidth = width / 3 - 28;

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
    const quantity = 1;
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
              size={20}
              style={{ color: "white" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 240,
    width: cardWidth,
    marginHorizontal: 7.5,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "80%",
    height: "80%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: MyColors.primary,
    marginBottom: 5,
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
    marginRight: "auto",
  },
  addToCart: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: MyColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
