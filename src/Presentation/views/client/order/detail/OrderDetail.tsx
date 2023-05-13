import React, { useEffect } from "react";
import { FlatList, Text, View, Image, ToastAndroid } from "react-native";
import styles from "./Styles";
import { StackScreenProps } from "@react-navigation/stack";
import { OrderDetailItem } from "./Item";
import { DateFormater } from "../../../../utils/DateFormater";
import useViewModel from "./ViewModel";
import { RoundedButton } from "../../../../components/RoundedButton";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator";

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
    open,
    value,
    items,
    getTotal,
    updateToOnTheWayOrder,
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

  return (
    <View style={styles.container}>
      <Text style={styles.products}>
        <FlatList
          data={order.products}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => <OrderDetailItem product={item} />}
        />
      </Text>
      <View style={styles.info}>
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
            <Text style={styles.infoTitle}>Direccíon de entrega</Text>
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
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>REPARTIDOR ASIGNADO</Text>
            <Text style={styles.infoDescription}>
              {order.delivery?.name} {order.delivery?.lastname}
            </Text>
          </View>

          <Image
            style={styles.infoImage}
            source={require("../../../../../../assets/my_user.png")}
          />
        </View>

        <View style={styles.totalInfo}>
          <Text style={styles.total}>TOTAL : $ {total} </Text>
          <View style={styles.button}>
            {order.status == "EN CAMINO" && (
              <RoundedButton
                text="RASTREAR PEDIDO"
                onPress={() =>
                  navigation.navigate("ClientOrderMapScreen", {
                    order: order,
                  })
                }
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
