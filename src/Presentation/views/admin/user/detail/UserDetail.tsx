import React from "react";
import { Text, View, Image } from "react-native";
import { UserStackParamList } from "../../../../navigator/AdminUserNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import styles from "./Styles";

interface Props
  extends StackScreenProps<UserStackParamList, "AdminUserViewScreen"> {}

export const AdminUserViewScreen = ({ navigation, route }: Props) => {
  const { user } = route.params;

  // Función para enmascarar el password
  const maskPassword = (password: string) => {
    return "*".repeat(password.length);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../../../assets/fondoPerfil.jpg")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        <Image
          source={
            user?.image
              ? { uri: user?.image }
              : require("../../../../../../assets/user.png")
          }
          style={styles.logoImage}
        />
      </View>

      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require("../../../../../../assets/user.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>
              {user?.name}
              {user?.lastname}
            </Text>
            <Text style={styles.formTextDescription}>Nombre del usuario</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require("../../../../../../assets/email.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.email}</Text>
            <Text style={styles.formTextDescription}>Correo electronico</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require("../../../../../../assets/phone.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.phone}</Text>
            <Text style={styles.formTextDescription}>Telefono</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require("../../../../../../assets/user.png")} // Cambia el icono según tu preferencia
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.created_at_register}</Text>
            <Text style={styles.formTextDescription}>Fecha de registro</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
