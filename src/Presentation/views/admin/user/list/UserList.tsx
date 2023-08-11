import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { AdminUserListItem } from "./Item";
import useViewModel from "./ViewModel";

export const AdminUserListScreen = () => {
  const { user, users, getAllUsers } = useViewModel();

  useEffect(() => {
    getAllUsers(user);
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id!.toString()} // Cambia esto según la estructura del objeto User
        renderItem={({ item }) => <AdminUserListItem user={item} />}
      />
    </View>
  );
};
