import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserStackParamList } from "../../../../navigator/AdminUserNavigator";
import { User } from "../../../../../Domain/entities/User";

interface Props {
  user: User;
}

export const AdminUserListItem = ({ user }: Props) => {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AdminUserViewScreen", { user: user })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              user?.image
                ? { uri: user?.image }
                : require("../../../../../../assets/user.png")
            }
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.clientNumber}>Cliente #{user.id}</Text>
          <Text style={styles.name}>
            {user.name} {user.lastname}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
          {/* Agrega más información si es necesario */}
        </View>
      </View>
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center", // Centra verticalmente los elementos
    height: 90,
    marginHorizontal: 20,
    marginTop: 10,
  },
  imageContainer: {
    width: "20%",
    alignItems: "center", // Centra verticalmente la imagen
  },
  image: {
    width: 60, // Tamaño ajustable para la imagen
    height: 60, // Tamaño ajustable para la imagen
    resizeMode: "contain",
    borderRadius: 30, // Ajustable según la mitad del tamaño de la imagen
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  clientNumber: {
    color: "gray",
    fontSize: 12,
  },
  name: {
    color: "black",
    fontSize: 15,
  },
  email: {
    color: "gray",
    fontSize: 12,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 20,
    flex: 1,
  },
  // Resto de tus estilos aquí
});
