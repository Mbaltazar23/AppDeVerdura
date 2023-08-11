import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  //TouchableOpacity,
} from "react-native";
import { TransferDataModal } from "./ModalDataTransacction";
import { Order } from "../../Domain/entities/Order";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientOrderStackParamList } from "../navigator/ClientOrderStackNavigator";

interface Props {
  onAnimationEnd: () => void;
  order: Order; // Asegúrate de tener acceso a la interfaz Order
  navigation: StackNavigationProp<
    ClientOrderStackParamList,
    "ClientOrderDetailScreen",
    undefined
  >;
}

export const PaymentStatusMessage = ({
  onAnimationEnd,
  order,
  navigation,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const showAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideAnimation = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      onAnimationEnd();
      scaleAnim.setValue(0); // Reiniciar la escala a 0 para la siguiente animación
    });
  };

  useEffect(() => {
    showAnimation();

    const timer = setTimeout(() => {
      hideAnimation();
    }, 40000); // Cambia el valor a 30000 para que el mensaje dure 30 segundos

    return () => {
      clearTimeout(timer);
      navigation.replace("ClientOrderListScreen");
    };
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
    onAnimationEnd();
    scaleAnim.setValue(0);
  };

  const handlePaymentMethod = () => {
    if (order.payment?.method === "Transbank") {
      return (
        <Text style={styles.messageText}>
          Puede ir al apartado de PAGADO para pagar por Transbank
        </Text>
      );
    } else if (order.payment?.method === "Transferencia") {
      return (
        <View>
          <Text style={styles.messageText}>
            Puede ir al apartado de PAGADO para realizar la Transferencia con un boton
          </Text>
          {/*    <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.linkText}>
              Ver detalles de para la transferencia
            </Text>
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return (
        <Text style={styles.messageText}>
          Puede proceder a esperar su Pedido para pagarlo..
        </Text>
      );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
      ]}
    >
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{handlePaymentMethod()}</Text>
      </View>
      <Image
        source={require("../../../assets/checkmark.png")}
        style={styles.checkmark}
      />
      <TransferDataModal visible={modalVisible} onClose={handleModalClose} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "40%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 96,
    height: 96,
    position: "absolute",
    top: -110,
    alignSelf: "center",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  checkmark: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  messageText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  linkText: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 5,
  },
});
