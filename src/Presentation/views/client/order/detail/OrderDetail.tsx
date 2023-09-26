import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  ToastAndroid,
  ImageBackground,
  ScrollView,
} from "react-native";
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator";
import { TransbankPaymentModal } from "../../../../components/ModalTranbankForm";
import { PaymentStatusMessage } from "../../../../components/CustomMessageStatusOrderPayed";
import { TransferDataModal } from "../../../../components/ModalDataTransacction";
import { StackScreenProps } from "@react-navigation/stack";
import { OrderDetailItem } from "./Item";
import { PRICE_DELIVERY } from "../../../../constants/PriceDelivery";
import { RoundedButton } from "../../../../components/RoundedButton";
import { DateFormater } from "../../../../utils/DateFormater";
import { Picker } from "@react-native-picker/picker";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<
    ClientOrderStackParamList,
    "ClientOrderDetailScreen"
  > {}

export const ClientOrderDetailScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const {
    total,
    responseMessage,
    getTotal,
    values,
    paymentMethods,
    handlePayment,
    handleMethodSelection,
    modalVisible,
    handleCloseModal,
    handleOpenModal,
    openTransbankURL,
    validateTransbank,
    transbankUrl,
    transbankToken,
    transbankModalVisible,
    setTransbankModalVisible,
    orderGet,
    handleShowMessage,
    showMessage,
    setShowMessage,
  } = useViewModel(order);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    if (total === 0.0) {
      getTotal();
    }
  }, []);

  const handlePaymentbtn = async () => {
    const paymentSuccess = await handlePayment();
    if (paymentSuccess?.success) {
      await handleShowMessage();
    }
  };

  useEffect(() => {
    if (order.payment?.method === "Transbank" && order.process == 1) {
      validateTransbank();
    }
  }, [order, transbankUrl, transbankToken]);

  return (
    <ImageBackground
      source={require("../../../../../../assets/fondo-difuminado.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.products}>
          <FlatList
            data={order.products}
            keyExtractor={(item) => item.id!}
            renderItem={({ item }) => <OrderDetailItem product={item} />}
          />
        </View>
        <View style={styles.info}>
          <ScrollView>
            <View style={styles.infoRow}>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Fecha del pedido</Text>
                <Text style={styles.infoDescription}>
                  {DateFormater(order.timestamp!)}
                </Text>
              </View>
              <Image
                style={styles.infoImage}
                source={require("../../../../../../assets/reloj.png")}
              />
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Cliente y Telefono</Text>
                <Text style={styles.infoDescription}>
                  {order.client?.name} {order.client?.lastname} -
                  {order.client?.phone}
                </Text>
              </View>
              <Image
                style={styles.infoImage}
                source={require("../../../../../../assets/user.png")}
              />
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Dirección de entrega</Text>
                <Text style={styles.infoDescription}>
                  {order.address?.address} - {order.address?.neighborhood}
                </Text>
              </View>
              <Image
                style={styles.infoImage}
                source={require("../../../../../../assets/location.png")}
              />
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.total}>
                TOTAL : $ {total.toLocaleString("en-US")}
              </Text>
            </View>
            {total < 20000 ? (
              <View style={styles.infoRow}>
                <Text style={styles.paymentLabel}>Recargo por la compra y delivery:</Text>
                <Text style={styles.paymentMethod}>
                  $ {PRICE_DELIVERY.toLocaleString("en-US")}
                </Text>
              </View>
            ) : (
              <View style={styles.infoRow}>
                <Text style={styles.paymentLabel}>Recargo por la compra y delivery:</Text>
                <Text style={styles.paymentMethod}>Gratis</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              {/* Mostrar datos del total a pagar*/}
              <Text style={styles.paymentLabel}>Total a pagar:</Text>
              <Text style={styles.paymentMethod}>
                $ {( total < 20000 ? total + PRICE_DELIVERY: total).toLocaleString("en-US")}
              </Text>
            </View>
            {order.status === "RECEPCIONADO" && (
              <View style={styles.paymentSection}>
                {/* Sección de pago */}
                <View style={styles.paymentDropdown}>
                  <Text style={styles.paymentLabelDropdown}>
                    Seleccionar medio de pago
                  </Text>
                  <Picker
                    selectedValue={values.method}
                    onValueChange={handleMethodSelection}
                    style={styles.paymentPicker}
                  >
                    {paymentMethods.map((method) => (
                      <Picker.Item
                        key={method.value}
                        label={method.label}
                        value={method.value}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.paymentButtonContainer}>
                  <RoundedButton
                    text="Realizar Pago"
                    onPress={handlePaymentbtn}
                  />
                </View>
              </View>
            )}
            {order.status === "PAGADO" && (
              <View style={styles.paymentSection}>
                <View style={styles.paymentInfo}>
                  {/* Mostrar medio de pago */}
                  <Text style={styles.paymentLabel}>Medio de Pago:</Text>
                  <Text style={styles.paymentMethod}>
                    {order.payment?.method}
                  </Text>
                </View>

                {/* Agregar botón según payment.method y process */}
                {order.payment?.method !== "Efectivo" && (
                  <View style={styles.buttonContainer}>
                    {order.payment?.method === "Transferencia" ? (
                      <>
                        <RoundedButton
                          text="Ver Datos"
                          onPress={handleOpenModal}
                        />
                        <TransferDataModal
                          order={order}
                          visible={modalVisible}
                          onClose={handleCloseModal}
                          navigation={navigation}
                          optionMessage="no"
                        />
                      </>
                    ) : order.payment?.method === "Transbank" &&
                      order.process === 1 ? (
                      <RoundedButton
                        text="Pagar"
                        onPress={() => openTransbankURL()}
                      />
                    ) : (
                      <RoundedButton
                        text="Ver Pago"
                        onPress={() =>
                          navigation.replace("ClientOrderPayTransbankScreen", {
                            order: order,
                          })
                        }
                      />
                    )}
                  </View>
                )}
              </View>
            )}
            {/* Modal con el componente TransbankPaymentModal */}
            <TransbankPaymentModal
              order={order}
              visible={transbankModalVisible}
              transbankUrl={transbankUrl}
              transbankToken={transbankToken}
              methodModal={setTransbankModalVisible}
              navigation={navigation}
            />
          </ScrollView>  
          {showMessage && (
              <PaymentStatusMessage
                onAnimationEnd={() => {
                  setShowMessage(false);
                }}
                order={orderGet} // Pasa el pedido actualizado
                urlTransbank={transbankUrl}
                tokenTransbank={transbankToken}
                navigation={navigation}
              />
            )}
        </View>
      </View>
    </ImageBackground>
  );
};
