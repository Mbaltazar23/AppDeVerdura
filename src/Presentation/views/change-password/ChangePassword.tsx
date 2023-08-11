import React, { useEffect } from "react";
import { ScrollView, Text, ToastAndroid, TouchableOpacity, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/MainStackNavigator";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";

export const ChangePasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { password01, password02, onChange, changePassword, errorMessage, user } =
    useViewModel();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      const role = user.roles[0]?.name; // Accede al primer objeto del arreglo "roles" y obtiene el valor de "role"
      if (role === "Cliente") {
        // Verifica si el valor de "role" es "Alumno"
        navigation.replace("ClientTabsNavigator");
      } else {
        navigation.replace("AdminTabsNavigator");
      }
    }
  }, [user]);

  return (
    // COLUMN
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/fondoDeVerdura.jpg")}
        style={styles.imageBackground}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>DE VERDURA</Text>
      </View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>RESETE SU PASSWORD</Text>
          <CustomTextInput
            image={require("../../../../assets/password.png")}
            placeholder="Ingrese su nueva Password"
            keyboardType="default"
            property="password01"
            onChangeText={onChange}
            value={password01}
            secureTextEntry={true}
          />

          <CustomTextInput
            image={require("../../../../assets/confirm_password.png")}
            placeholder="Repita su nueva Password"
            keyboardType="default"
            property="password02"
            onChangeText={onChange}
            value={password02}
            secureTextEntry={true}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton
              text="Recuperar Cuenta"
              onPress={() => changePassword()}
            />
          </View>
          <View style={styles.formPassword}>
            <Text>Recordo su Password ?</Text>
            <TouchableOpacity onPress={() => navigation.replace("HomeScreen")}>
              <Text style={styles.formPasswordText}>Ingrese</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};