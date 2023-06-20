import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import { ClientStackParamList } from "../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { UserConext } from "../context/UserContext";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  isVisible: boolean;
  toggleMenu: () => void;
}

export const MenuModal = ({ isVisible, toggleMenu }: Props) => {
  const navigation = useNavigation<StackNavigationProp<ClientStackParamList>>();
  const { user, removeUserSession } = useContext(UserConext);
  const [isModalVisible, setModalVisible] = useState(false);

  const modalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
    }
  }, [isVisible]);

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
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
            <Text style={styles.headerText}>Hola {user.name} {user.lastname}</Text>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("ProfileInfoScreen")}
            >
              <Icon name="person" size={20} color="green" />
              <Text style={styles.optionText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress("ClientAddressListScreen")}
            >
              <Icon name="location-on" size={20} color="green" />
              <Text style={styles.optionText}>Dirección</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {}}
            >
              <Icon name="favorite" size={20} color="green" />
              <Text style={styles.optionText}>Lista de Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => removeUserSession()}
            >
              <Icon name="exit-to-app" size={20} color="green" />
              <Text style={styles.optionText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    height:'20%'
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
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  option: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  optionText: {
    fontSize: 14,
    marginLeft: 14,
    color: "green",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
});
