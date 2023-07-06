import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { ProductSearchFavoriteInput } from "./InputSearch";
import { CardItemFavoriteProductSearch } from "./ItemProduct";
import { Product } from "../../../../../Domain/entities/Product";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientFavoriteProductSearchScreen"> {}

export const ClientFavoriteProductSearchScreen = ({ navigation, route }: Props) => {
  const { productList, handleSearch, searchText, setSearchText } =
    useViewModel();

  const renderProductItem = ({ item }: { item: Product }) => (
    <CardItemFavoriteProductSearch product={item} navigation={navigation} />
  );

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <ProductSearchFavoriteInput onSearch={setSearchText} searchText={searchText} />
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        data={productList}
        numColumns={3}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id!.toString()}
        ListEmptyComponent={
          searchText === "" ? <Text>No se encontraron productos</Text> : null
        }
      />
    </View>
  );
};
