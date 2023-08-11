import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { RootStackParamList } from "../../navigator/MainStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { CustomTextInput } from "../../components/CustomTextInput";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props extends StackScreenProps<RootStackParamList, "LoginScreen"> {}

export const LoginScreen = ({ navigation, route }: Props) => {
  const {
    email,
    password,
    onChange,
    login,
    errorMessage,
    user,
    removeEmailReset,
  } = useViewModel();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      const role = user.roles[0]?.name; // Accede al primer objeto del arreglo "roles" y obtiene el valor de "role"
      if (role === "Administrador") {
        // Verifica si el valor de "role" es "Alumno"
        navigation.replace("AdminTabsNavigator");
      } else {
        navigation.replace("ClientTabsNavigator");
      }
    }
  }, [user]);

  useEffect(() => {
    removeEmailReset();
  }, [removeEmailReset]);

  return (
    //Column
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/fondoDeVerdura.jpg")}
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../../assets/logo.png")}
        />
        <Text style={[styles.logoText, { fontSize: 35 }]}>DE</Text>
        <Text style={[styles.logoText, { fontSize: 35 }]}>VERDURA</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Correo electronico"
          keyboardType="email-address"
          property="email"
          onChangeText={onChange}
          value={email}
        />

        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Contraseña"
          keyboardType="default"
          property="password"
          onChangeText={onChange}
          value={password}
          secureTextEntry={true}
        />

        <View style={{ marginTop: 30 }}>
          <RoundedButton text="INGRESAR" onPress={() => login()} />
        </View>
        <View style={styles.formRegister}>
          <Text>No tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.replace("RegisterScreen")}
          >
            <Text style={styles.formRegisterText}>Registrate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formPassword}>
          <Text>Olvido su Password ?</Text>
          <TouchableOpacity
            onPress={() => navigation.replace("HomeScreen")}
          >
            <Text style={styles.formPasswordText}>Recuperela</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
