import React, { useEffect } from "react";
import { RootStackParamList } from "../../navigator/MainStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Image,
  ScrollView,
} from "react-native";
import { CustomTextInput } from "../../components/CustomTextInput";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<RootStackParamList, "ResetPasswordScreen"> {}

export const ResetPasswordScreen = ({ navigation, route }: Props) => {
  const { email, errorMessage, onChange, resetPassEmail, emailRest } =
    useViewModel();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (emailRest !== "") {
      navigation.replace("ChangePasswordScreen");
      console.log(emailRest);
    }
  }, [emailRest]);

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
        <Text style={[styles.logoText, { fontSize: 35 }]}>DE</Text>
        <Text style={[styles.logoText, { fontSize: 35 }]}>VERDURA</Text>
      </View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>
            INGRESE SU CORREO PARA RECUPERARLO
          </Text>
          <CustomTextInput
            placeholder="Ingrese su Correo"
            keyboardType="default"
            image={require("../../../../assets/email.png")}
            property="email"
            onChangeText={onChange}
            value={email}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="Recuperar" onPress={() => resetPassEmail()} />
          </View>
          <View style={styles.formPassword}>
            <Text>Recuerda su Password ?</Text>
            <TouchableOpacity
              onPress={() => navigation.replace("LoginScreen")}
            >
              <Text style={styles.formPasswordText}>Ingrese</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
