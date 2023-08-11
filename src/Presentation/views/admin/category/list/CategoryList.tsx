import React, { useEffect } from "react";
import { FlatList, ToastAndroid, View } from "react-native";
import { AdminDeleteConfirmation } from "../../../../components/ConfirmationMessage";
import { AdminCategoryListItem } from "./Item";
import useViewModel from "./ViewModel";

export const AdminCategoryListScreen = () => {
  const {
    categories,
    responseMessage,
    handleConfirmDeleteCategory,
    handleCancelDeleteCategory,
    showDeleteConfirmation,
    handleDeleteCategory,
  } = useViewModel();

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={{ backgroundColor: "white" }}>
      <AdminDeleteConfirmation
        type="category"
        onConfirm={handleConfirmDeleteCategory}
        onCancel={handleCancelDeleteCategory}
        visible={showDeleteConfirmation}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <AdminCategoryListItem
            category={item}
            remove={() => handleDeleteCategory(item.id!)}
          />
        )}
      />
    </View>
  );
};
