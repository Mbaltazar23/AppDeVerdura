import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { CardItemProductSearch } from "./ItemProduct";
import { ActionToCartMessage } from "../../../../components/CustomMessageCart";
import { ProductSearchInput } from "./InputSearch";
import { StackScreenProps } from "@react-navigation/stack";
import { Product } from "../../../../../Domain/entities/Product";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientProductSearchScreen"> {}

export const ClientProductSearchScreen = ({ navigation, route }: Props) => {
  const {
    productList,
    handleSearch,
    searchText,
    setSearchText,
    handleAddToCart,
    setShowMessage,
    showMessage,
  } = useViewModel();

  const renderProductItem = ({ item }: { item: Product }) => (
    <CardItemProductSearch product={item} navigation={navigation} onAddToCart={handleAddToCart}/>
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
      {showMessage && (
        <ActionToCartMessage
          onAnimationEnd={() => setShowMessage(false)}
          message="Producto Agregado Exitosamente!"
        />
      )}
    </View>
  );
};
