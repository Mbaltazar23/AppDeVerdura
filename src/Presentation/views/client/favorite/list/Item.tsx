import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";
import { Product } from "../../../../../Domain/entities/Product";
import { Dimensions, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("screen");
const cardWidth = width / 3 - 28;

interface CardProps {
  product: Product;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientFavoriteProductsScreen",
    undefined
  >;
  removeProduct: (product: Product) => void;
}

export const Card = ({ product, navigation, removeProduct }: CardProps) => {
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
        <TouchableOpacity onPress={() => removeProduct(product)}>
          <View style={styles.removeFavorite}>
            <Icon
              name="delete"
              size={19}
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
  removeFavorite: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: MyColors.warning,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
