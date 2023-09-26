import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { RoundedButton } from "../../../../components/RoundedButton";

interface Props
  extends StackScreenProps<
    ClientOrderStackParamList,
    "ClientOrderPayTransbankScreen"
  > {}

export const ClientOrderPayTransbankScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const {
    statusMessage,
    vciMessage,
    formattedTransactionDate,
    paymentTypeCode,
    accountingDate,
    showInstallments,
  } = useViewModel(order);
  //console.log("ORDER: ", JSON.stringify(order));

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../../../../assets/checked.png")}
        style={styles.ticketImage}
      />
      <Text style={styles.approvedText}>Transacción Aprobada</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Información del Cliente</Text>
        <View style={styles.clientInfo}>
          <Image
            source={
              order.client?.image
                ? { uri: order.client?.image }
                : require("../../../../../../assets/user_image.png")
            }
            style={styles.clientImage}
          />
          <View style={styles.clientDetails}>
            <Text>
              Nombre: {order.client?.name} {order.client?.lastname}
            </Text>
            <Text>Teléfono: {order.client?.phone}</Text>
            <Text>Email: {order.client?.email}</Text>
            <Text>
              Dirección: {order.address?.address} -{" "}
              {order.address?.neighborhood}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.transbankInfo}>
          <Text style={styles.cardTitle}>Información de la Transacción</Text>
          <Text>
            Autorizacion: <Text style={styles.subtext}>{vciMessage}</Text>
          </Text>
          <Text>
            Estado: <Text style={styles.subtext}>{statusMessage}</Text>
          </Text>
          <Text>
            Número de Tarjeta: *****
            {order.transbank?.card_detail?.card_number || "N/A"}
          </Text>
          <Text>Fecha de Autorización: {accountingDate || "N/A"}</Text>
          <Text>
            Fecha de la Transacción:{" "}
            {formattedTransactionDate ? formattedTransactionDate.toLocaleString() : "N/A"}
          </Text>
          <Text>Tipo de Pago: {paymentTypeCode || "N/A"}</Text>
          <Text>
            {showInstallments
              ? `Monto en Cuotas: $${
                  order.transbank?.installments_amount.toLocaleString(
                    "en-US"
                  ) || "N/A"
                }`
              : `Monto pagado: $${
                  order.transbank?.amount.toLocaleString("en-US") || "N/A"
                }`}
          </Text>
          {showInstallments && (
            <Text>
              Monto Total: $
              {order.transbank?.amount.toLocaleString("en-US") || "N/A"}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.productsContainer}>
          <Text style={styles.cardTitleProducts}>Productos Comprados</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Producto</Text>
            <Text style={styles.tableHeaderText}>Precio</Text>
            <Text style={styles.tableHeaderText}>Cantidad</Text>
            <Text style={styles.tableHeaderText}>Subtotal</Text>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.productRow}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <Text style={styles.productPrice}>
                ${product.price.toLocaleString("en-US")}
              </Text>
              <Text style={styles.productQuantity}>{product.quantity}</Text>
              <Text style={styles.productSubtotal}>
                ${(product.price * product.quantity!).toLocaleString("en-US")}
              </Text>
            </View>
          ))}
            <RoundedButton
              text="Volver a sus Pedidos"
              onPress={() => navigation.replace("ClientOrderListScreen")}
            />
        </View>
      </View>
      {/* Agregar más secciones según sea necesario */}
    </ScrollView>
  );
};
