import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../navigator/MainStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { RoundedButton } from "../../components/RoundedButton";
import { useFonts } from "expo-font";
import { User } from "../../../Domain/entities/User";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props extends StackScreenProps<RootStackParamList, "HomeScreen"> {}

export const HomeScreen = ({ navigation, route }: Props) => {
  const { user } = useViewModel();

  const [loaded] = useFonts({
    Another: require("../../../../assets/fonts/AnotherFont.ttf"),
    ComicSansMS: require("../../../../assets/fonts/ComicSansMS.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleNavigation = (user: User) => {
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      const role = user.roles[0]?.name; // Obtener el primer rol del usuario
      if (role === "Administrador") {
        // Navegar a la pantalla del Administrador
        navigation.replace("AdminTabsNavigator");
      } else {
        // Navegar a la pantalla del Cliente
        navigation.replace("ClientTabsNavigator");
      }
    }
  };

  handleNavigation(user);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/fondoDeVerdura.jpg")}
      />
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { fontSize: 70 }]}>DE</Text>
        <Text style={[styles.logoText, { fontSize: 70 }]}>VERDURA</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formButton}>
          <RoundedButton
            text="INICIAR SESIÓN"
            onPress={() => navigation.replace("LoginScreen")}
            style={styles.colorBtnLogin}
            textStyle={{ fontSize: 18 }}
          />
        </View>

        <View style={[styles.formButton, { alignItems: "center" }]}>
          <RoundedButton
            text="REGISTRARTE"
            onPress={() => navigation.replace("RegisterScreen")}
            style={styles.formBtnRegister}
            textStyle={{ fontFamily: "ComicSansMS", fontSize: 20 }}
          />
        </View>
        <TouchableOpacity
          style={[styles.forgotPassword, { marginTop: 30 }]}
          onPress={() => navigation.replace("ResetPasswordScreen")}
        >
          <Text
            style={[styles.forgotPasswordText, { fontFamily: "ComicSansMS" }]}
          >
            ¿Olvidaste tu clave?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
