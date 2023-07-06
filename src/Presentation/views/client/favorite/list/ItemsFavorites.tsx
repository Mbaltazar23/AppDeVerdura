import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { GetCategoriesByProductsFavoritesUseCase } from "../../../../../Domain/useCases/favorite/GetCategoriesByProductsFavorites";
import { Category } from "../../../../../Domain/entities/Category";
import { Product } from "../../../../../Domain/entities/Product";
import { UserContext } from "../../../../context/UserContext";
import { Card } from "./Item";
import { DeleteFavoriteProductUseCase } from "../../../../../Domain/useCases/favorite/DeleteFavoriteProduct";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";

interface CategoryListProps {
  products: Product[];
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientFavoriteProductsScreen",
    undefined
  >;
}

export const ProductsFavoritesList = ({
  products,
  navigation,
}: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchCategories = async () => {
    if (user && user.id) {
      const fetchedCategories = await GetCategoriesByProductsFavoritesUseCase(
        user.id
      );
      setCategories(fetchedCategories);
    }
  };

  const removeFavoriteProduct = async (product: Product) => {
    const response = await DeleteFavoriteProductUseCase(product);
    setLoading(true);
    setResponseMessage(response.message);
    setLoading(false);
  };

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    fetchCategories();
  }, [user, products]);

  return (
    <ScrollView>
      {categories.length > 0 ? (
        categories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <ScrollView horizontal style={styles.productScrollView}>
              {products
                .filter((product) => product.id_category === category.id)
                .map((product) => (
                  <Card
                    key={product.id}
                    product={product}
                    navigation={navigation}
                    removeProduct={removeFavoriteProduct}
                  />
                ))}
            </ScrollView>
            {loading && (
              <ActivityIndicator
                style={MyStyles.loading}
                size="large"
                color={MyColors.primary}
              />
            )}
          </View>
        ))
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>
            No hay productos favoritos disponibles.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14, // Agregamos un margen inferior para separar el nombre de la categoría de los elementos del producto
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  productScrollView: {
    marginLeft: 0,
  },
});
