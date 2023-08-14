import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientOrderStackParamList } from "../navigator/ClientOrderStackNavigator";
import { TransferDataModal } from "./ModalDataTransacction";
import { Order } from "../../Domain/entities/Order";

interface Props {
  onAnimationEnd: () => void;
  order: Order;
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
      scaleAnim.setValue(0);
    });
  };

  const handleCloseModalTransfer = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    showAnimation();

    const timer = setTimeout(() => {
      if (order.payment?.method !== "Transferencia") {
        hideAnimation();
        navigation.replace("ClientOrderListScreen");
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [order]);

  const handlePaymentMethod = () => {
    if (order.payment?.method === "Transbank") {
      return (
        <Text style={[styles.messageText, styles.messageLarge]}>
          Puede ir al apartado de PAGADO para pagar por Transbank
        </Text>
      );
    } else if (order.payment?.method === "Transferencia") {
      return (
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={[styles.linkText, styles.linkTextLarge]}>
              Pinche aquí para realizar la transferencia
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Text style={[styles.messageText, styles.messageLarge]}>
          Puede proceder a esperar su Pedido para pagarlo..
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{handlePaymentMethod()}</Text>
      </View>
      <Image
        source={require("../../../assets/checkmark.png")}
        style={styles.checkmark}
      />
      <TransferDataModal
        optionMessage="si"
        order={order}
        navigation={navigation}
        onClose={handleCloseModalTransfer}
        visible={modalVisible}
      />
    </View>
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
  messageLarge: {
    fontSize: 16, // Cambia el tamaño de la fuente para el mensaje grande
  },
  linkTextLarge: {
    fontSize: 16, // Cambia el tamaño de la fuente para el enlace grande
  },
});