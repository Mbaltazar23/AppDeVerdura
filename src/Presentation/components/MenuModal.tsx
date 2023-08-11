import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import { ClientStackParamList } from "../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/MainStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { useUserLocal } from "../hooks/useUserLocal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { UserContext } from "../context/UserContext";

interface Props {
  isVisible: boolean;
  toggleMenu: () => void;
}

export const MenuModal = ({ isVisible, toggleMenu }: Props) => {
  const navigation = useNavigation<StackNavigationProp<ClientStackParamList>>();
  const navigateHome = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { removeUserSession } = useContext(UserContext);

  const { user } = useUserLocal();

  const [isModalVisible, setModalVisible] = useState(false);

  const modalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
    }
  }, [isVisible]);

  const closeModal = async () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      toggleMenu();
    });
  };

  useEffect(() => {
    if (isModalVisible) {
      Animated.spring(modalAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  const modalTranslateX = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  if (!isModalVisible) {
    return null;
  }

  const handleOptionPress = (screenName: any) => {
    navigation.navigate(screenName);
    closeModal();
  };

  const handleLogout = async () => {
    await removeUserSession();
    navigateHome.replace("HomeScreen");
  };

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={toggleMenu}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleMenu}
      >
        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: modalTranslateX }] },
          ]}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerBackground} />
            <Text style={styles.headerText}>
              Hola {user?.name} {user?.lastname}
            </Text>
          </View>
          <ImageBackground
          source={require("../../../assets/fondo-difuminado.jpg")}
          style={styles.optionsContainer}
          imageStyle={[styles.backgroundImage, { opacity: 0.2 }]} // Ajusta la opacidad
        >
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("ProfileInfoScreen")}
            >
              <Icon name="person" size={30} color="red" />
              <Text style={styles.optionText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("ClientAddressListScreen")}
            >
              <Icon name="location-on" size={30} color="yellow" />
              <Text style={styles.optionText}>Dirección</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("ClientFavoriteProductsScreen")}
            >
              <Icon name="favorite" size={30} color="green" />
              <Text style={styles.optionText}>Lista de Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("ClientTermsConditionsScreen")}
            >
              <Icon name="description" size={30} color="orange" />
              <Text style={styles.optionText}>Terminos y condiciones</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleLogout()}
            >
              <Icon name="exit-to-app" size={30} color="black" />
              <Text style={styles.optionText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "55%",
    height: "100%",
    backgroundColor: "transparent",
  },
  headerContainer: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    height: "20%",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "green",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: -1,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  optionsContainer: {
    flex: 1,
    marginTop: 0,
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.2,
  },
  option: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  optionText: {
    fontSize: 15, // Aumenta el tamaño de la letra
    marginLeft: 14,
    color: "black",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
});
