import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { CardItemProductSearch } from "./ItemProduct";
import { Product } from "../../../../../Domain/entities/Product";
import { ProductSearchInput } from "./InputSearch";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductSearchScreen"> {}

export const ClientProductSearchScreen = ({ navigation, route }: Props) => {
  const { productList, handleSearch, searchText, setSearchText } =
    useViewModel();

  const renderProductItem = ({ item }: { item: Product }) => (
    <CardItemProductSearch product={item} navigation={navigation} />
  );

  useEffect(() => {
      handleSearch(searchText);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <ProductSearchInput onSearch={setSearchText} searchText={searchText} />
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
