import React, { useEffect } from "react";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductsFavoritesList } from "./ItemsFavorites";
import Icon from "react-native-vector-icons/MaterialIcons";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<
    ClientStackParamList,
    "ClientFavoriteProductsScreen"
  > {}

export const ClientFavoriteProductsScreen = ({ navigation, route }: Props) => {
  const { products, getProductsFavorites } = useViewModel();

  useEffect(() => {
    getProductsFavorites();
  }, [products]);

  const handleSearchPress = () => {
    navigation.navigate("ClientFavoriteProductSearchScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={handleSearchPress}
        >
          <Icon name="search" size={28} style={styles.searchIcon} />
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchInputPlaceholder}>
              Busque un producto para añadir
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryListContainer}>
        <ProductsFavoritesList products={products} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};
