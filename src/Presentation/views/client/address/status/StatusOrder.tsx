import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { RoundedButton } from "../../../../components/RoundedButton";
import { DateFormater } from "../../../../utils/DateFormater";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientStatusOrderScreen"> {}

export const ClientStatusOrderScreen = ({ navigation, route }: Props) => {
  const { order } = route.params;
  const { calculateTotal, calculateProductTotal } = useViewModel(order);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={require("../../../../../../assets/checked.png")}
        />

        <Text style={styles.description}>
          Tu orden fue procesada exitosamente !!
        </Text>
        <Text style={styles.info}>
          {/* Cambiar el estilo del texto para hacerlo más llamativo */}
          <Text style={styles.infoHighlight}>
            Mira el estado de tu orden en la sección de MIS PEDIDOS en EN ESPERA
            para proceder a pagar
          </Text>
        </Text>
      </View>

      {/* Tabla para mostrar los detalles del pedido */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Detalles del Pedido</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellTitle}>Cliente:</Text>
          <Text style={styles.tableCellValue}>
            {order?.client?.name} {order?.client?.lastname}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellTitle}>Nro Orden:</Text>
          <Text style={styles.tableCellValue}>#{order?.id!}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellTitle}>Fecha del Pedido:</Text>
          <Text style={styles.tableCellValue}>
            {/* Convertir el timestamp a formato de fecha deseado */}
            {DateFormater(order?.timestamp!)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellTitle}>Dirección de Entrega:</Text>
          <Text style={styles.tableCellValue}>
            {order?.address?.address}, {order?.address?.neighborhood}
          </Text>
        </View>

        <Text style={[styles.tableTitle, styles.productTitle]}>Productos</Text>
        {/* Cabecera de la tabla de productos */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCellTitle, styles.productCell]}>
            Producto
          </Text>
          <Text style={[styles.tableCellTitle, styles.productCell]}>
            Precio c/u
          </Text>
          <Text style={[styles.tableCellTitle, styles.productCell]}>Total</Text>
        </View>
        {/* Mostrar la lista de productos en una tabla */}
        {order?.products?.map((product, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCellValue, styles.productCell]}>
              {product.name}
            </Text>
            <Text style={[styles.tableCellValue, styles.productCell]}>
              ${product.price.toLocaleString("en-US")}
            </Text>
            <Text style={[styles.tableCellValue, styles.productCell]}>
              {/* Mostrar el total por producto */}$
              {calculateProductTotal(product).toLocaleString("en-US")}
            </Text>
          </View>
        ))}
        {/* Mostrar el total general del pedido */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCellTitle, styles.productCell]}>
            Total:
          </Text>
          <Text style={[styles.tableCellValue, styles.productCell]}>
            ${calculateTotal(order?.products!).toLocaleString("en-US")}
          </Text>
        </View>
      </View>

      <View style={styles.button}>
        <RoundedButton
          text="REALIZAR MAS COMPRAS"
          onPress={() => navigation.navigate("ClientCategoryListScreen")}
        />
      </View>
    </ScrollView>
  );
};
