import React, { useContext, useEffect, useState } from "react";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { CreateFavoriteUseCase } from "../../../../../Domain/useCases/favorite/CreateFavorite";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserContext } from "../../../../context/UserContext";
import { Favorite } from "../../../../../Domain/entities/Favorite";
import { Product } from "../../../../../Domain/entities/Product";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("screen");
const cardWidth = width / 3 - 28;

interface CardProps {
  product: Product;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientFavoriteProductSearchScreen",
    undefined
  >;
}

export const CardItemFavoriteProductSearch = ({
  product,
  navigation,
}: CardProps) => {
  const { user } = useContext(UserContext);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  const addToWhishList = async () => {
    const values: Favorite = {
      id_user: user.id!,
      id_product: product.id!,
    };

    //console.log("Producto Formulario : " + JSON.stringify(values));
    setLoading(true);
    const response = await CreateFavoriteUseCase(values);
    setResponseMessage(response.message);
    setLoading(false);
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
        <TouchableOpacity onPress={addToWhishList}>
          <View style={styles.addToWhishList}>
            <Icon
              name="favorite"
              size={18}
              style={{ marginRight: 1, color: "white" }}
            />
          </View>
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator
            style={MyStyles.loading}
            size="large"
            color={MyColors.primary}
          />
        )}
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
  addToWhishList: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: MyColors.whishlist,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
