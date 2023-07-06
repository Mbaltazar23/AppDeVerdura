import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { CardSimilarsProduct } from "./Item";
import { Product } from "../../../../../Domain/entities/Product";

interface SimilarProductsProps {
  products: Product[];
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientProductDetailScreen",
    undefined
  >;
}

export const SimilarProductsList = ({
  products,
  navigation,
}: SimilarProductsProps) => {

  const renderProductItem = ({ item }: { item: Product }) => (
    <CardSimilarsProduct product={item} navigation={navigation} />
  );

  return (
    <View style={styles.similarProductsContainer}>
      <Text style={styles.similarProductsTitle}>Más productos similares</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id!.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  similarProductsContainer: {
    marginTop: 28,
    width: "100%",
    paddingHorizontal: 25,
  },
  similarProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
