import React, { useContext, useState } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { ClientOrderStackParamList } from "../navigator/ClientOrderStackNavigator";
import { ResponseStatusTransbank } from "../../Data/sources/remote/models/ResponseStatusTransbank";
import { StackNavigationProp } from "@react-navigation/stack";
import { MyColors, MyStyles } from "../theme/AppTheme";
import { RoundedButton } from "./RoundedButton";
import { OrderContext } from "../context/OrderContext";
import { WebView } from "react-native-webview";
import { Order } from "../../Domain/entities/Order";

interface TransbankPaymentModalProps {
  order: Order;
  visible: boolean;
  transbankUrl: string;
  transbankToken: string;
  methodModal: (visible: boolean) => void;
  navigation: StackNavigationProp<
    ClientOrderStackParamList,
    "ClientOrderDetailScreen",
    undefined
  >;
}
export const TransbankPaymentModal = ({
  order,
  visible,
  transbankUrl,
  transbankToken,
  methodModal,
  navigation,
}: TransbankPaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const { returnResponseTransbankPayment, getOrderById } =
    useContext(OrderContext);

  const handleWebViewLoad = () => {
    methodModal(true);
  };

  const closeModalWeb = () => {
    methodModal(false);
  };

  const validateTokenProcess = async () => {
    let result = {} as ResponseStatusTransbank;
    result = await returnResponseTransbankPayment(order.id!, transbankToken);
    if (result.success) {
      console.log("RESPONSE: ", JSON.stringify(result));
      const resOrder = await getOrderById(order);
      methodModal(false);
      setLoading(true);
      navigation.replace("ClientOrderPayTransbankScreen", {
        order: resOrder.data,
      });
      setLoading(false)
    } else {
      console.log("PAGO EN PROCESO", JSON.stringify(result));
    }
    return result;
  };

  return (
    <Modal visible={visible}>
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            html: `
              <html>
                <body>
                  <form id="transbankForm" method="POST" action="${transbankUrl}">
                    <input type="hidden" name="token_ws" value="${transbankToken}"/>
                    <!-- Agregar otros campos según sea necesario -->
                  </form>
                  <script>
                    document.getElementById("transbankForm").submit();
                  </script>
                </body>
              </html>
            `,
          }}
          onLoad={handleWebViewLoad}
          onNavigationStateChange={validateTokenProcess}
          //onLoadEnd={closeModalWeb}
        />
      </View>
      <RoundedButton text="Cerrar" onPress={closeModalWeb} />
      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </Modal>
  );
};
