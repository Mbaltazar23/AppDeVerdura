import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { GetProductsByCategoryUseCase } from "../../../../../Domain/useCases/product/GetProductsByCategory";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { Product } from "../../../../../Domain/entities/Product";
import { Card } from "./Card";

interface ProductListProps {
  categoryId: string;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen"
  >;
}

export const ProductList = ({
  categoryId,
  navigation,
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetProductsByCategoryUseCase(categoryId);
      setProducts(result);
    };
    fetchData();
  }, [categoryId]);

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <Card product={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
