import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/MainStackNavigator";
import { RoundedButton } from "../../components/RoundedButton";
import { CustomTextInput } from "../../components/CustomTextInput";
import { ModalPickImage } from "../../components/ModalPickImage";
import { MyColors } from "../../theme/AppTheme";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<RootStackParamList, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation, route }: Props) => {
  const {
    name,
    lastname,
    email,
    phone,
    password,
    confirmPassword,
    errorMessage,
    image,
    onChange,
    register,
    pickImage,
    takePhoto,
    user,
    loading,
  } = useViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (errorMessage != "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      navigation.replace("ClientTabsNavigator");
    }
  }, [user]);

  return (
    //Column
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/fondoDeVerdura.jpg")}
      />
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {image == "" ? (
            <Image
              source={require("../../../../assets/user_image.png")}
              style={styles.logoImage}
            />
          ) : (
            <Image source={{ uri: image }} style={styles.logoImage} />
          )}
        </TouchableOpacity>
        <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
      </View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>REGISTRARSE</Text>

          <CustomTextInput
            placeholder="Nombres"
            keyboardType="default"
            image={require("../../../../assets/user.png")}
            property="name"
            onChangeText={onChange}
            value={name}
          />

          <CustomTextInput
            placeholder="Apellidos"
            keyboardType="default"
            image={require("../../../../assets/my_user.png")}
            property="lastname"
            onChangeText={onChange}
            value={lastname}
          />

          <CustomTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            image={require("../../../../assets/email.png")}
            property="email"
            onChangeText={onChange}
            value={email}
          />

          <CustomTextInput
            placeholder="Telefono"
            keyboardType="numeric"
            image={require("../../../../assets/phone.png")}
            property="phone"
            onChangeText={onChange}
            value={phone}
          />

          <CustomTextInput
            placeholder="Contraseña"
            keyboardType="default"
            image={require("../../../../assets/password.png")}
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />

          <CustomTextInput
            placeholder="Confirmar Contraseña"
            keyboardType="default"
            image={require("../../../../assets/confirm_password.png")}
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
          />

          <View style={{ marginTop: 30 }}>
            <RoundedButton text="CONFIRMAR" onPress={() => register()} />
          </View>
          <View style={styles.formRegister}>
            <Text>Ya tengo cuenta</Text>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text style={styles.formRegisterText}>Ingrese</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
