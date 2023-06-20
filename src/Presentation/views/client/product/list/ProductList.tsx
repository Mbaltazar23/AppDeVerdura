import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import useViewModel from "./ViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./Styles";
import { ItemsCategoryList } from "./ItemsCategory";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductListScreen"> {}

export const ClientProductListScreen = ({ navigation, route }: Props) => {
  const { id_category } = route.params;
  const { products, getProducts, categories, getCategories } = useViewModel();

  useEffect(() => {
    getCategories();
  }, [categories]);

  useEffect(() => {
    getProducts(id_category);
  }, [id_category]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    id_category
  );

  useEffect(() => {
    setSelectedCategoryId(id_category);
  }, [id_category]);

  const handleCategorySelected = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    getProducts(categoryId);
  };

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const handleSearchPress = () => {
    navigation.navigate("ClientProductSearchScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Icon name="search" size={28} style={styles.searchIcon} />
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchInputPlaceholder}>Busque un producto</Text>
        </View>
      </TouchableOpacity>
      </View>
      <View style={styles.categoryListContainer}>
        <ItemsCategoryList
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          products={products}
          navigation={navigation}
          onCategorySelected={handleCategorySelected}
        />
      </View>
      {selectedCategory && (
        <View style={styles.selectedCategoryContainer}>
          <Text style={styles.selectedCategoryTitle}>
            {selectedCategory.name}
          </Text>
          <Text style={styles.selectedCategoryProductCount}>
            {
              products.filter(
                (product) => product.id_category === selectedCategoryId
              ).length
            }{" "}
            productos
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
