import React, { useEffect } from "react";
import { ToastAndroid, View } from "react-native";
import { AdminDeleteConfirmation } from "../../../../components/ConfirmationMessage";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { AdminProductListItem } from "./Item";
import { StackScreenProps } from "@react-navigation/stack";
import { FlatList } from "react-native-gesture-handler";
import useViewModel from "./ViewModel";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductListScreen"> {}

export const AdminProductListScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const {
    products,
    getProducts,
    responseMessage,
    showDeleteConfirmation,
    handleCancelDeleteProduct,
    handleConfirmDeleteProduct,
    handleDeleteProduct,
  } = useViewModel();
  //console.log("Category: " + JSON.stringify(category));

  useEffect(() => {
    if (category.id !== undefined) {
      getProducts(category.id!);
    }
  }, []);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={{ backgroundColor: "white" }}>
        <AdminDeleteConfirmation
          type="product"
          onConfirm={handleConfirmDeleteProduct}
          onCancel={handleCancelDeleteProduct}
          visible={showDeleteConfirmation}
        />
    
      <FlatList
        data={products}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminProductListItem
            product={item}
            remove={() => handleDeleteProduct(item)}
            category={category}
          />
        )}
      />
    </View>
  );
};
