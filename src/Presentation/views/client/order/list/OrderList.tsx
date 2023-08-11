import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  View,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { OrderListItem } from "./Item";
import useViewModel from "./ViewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  status: string;
}

const OrderListView = ({ status }: Props) => {
  const {
    ordersHolding,
    ordersPayed,
    ordersDispatched,
    ordersDelivery,
    getOrders,
    user,
  } = useViewModel();

  useEffect(() => {
    getOrders(user?.id!, status);
  }, [user]);

  const navigation =
    useNavigation<
      StackNavigationProp<ClientOrderStackParamList, "ClientOrderListScreen">
    >();

  return (
    <ImageBackground
      source={require("../../../../../../assets/fondo-difuminado.jpg")}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.content}>
        <FlatList
          data={
            status === "EN ESPERA"
              ? ordersHolding
              : status === "PAGADO"
              ? ordersPayed
              : status === "DESPACHADO"
              ? ordersDispatched
              : status === "ENTREGADO"
              ? ordersDelivery
              : []
          }
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <OrderListItem order={item} navigation={navigation} />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </ImageBackground>
  );
};

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "first":
      return <OrderListView status="EN ESPERA" />;
    case "second":
      return <OrderListView status="PAGADO" />;
    case "third":
      return <OrderListView status="DESPACHADO" />;
    case "fourth":
      return <OrderListView status="ENTREGADO" />;
    default:
      return <OrderListView status="EN ESPERA" />;
  }
};

export const ClientOrderListScreen = () => {
  const layout = useWindowDimensions();

  const { getOrders, user } = useViewModel();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "EN ESPERA" },
    { key: "second", title: "PAGADO" },
    { key: "third", title: "DESPACHADO" },
    { key: "fourth", title: "ENTREGADO" },
  ]);

  const isFocused = useIsFocused(); // Nueva adición

  useEffect(() => {
    // Si la pantalla está enfocada (accedida desde la pestaña de pedidos), obtén todos los pedidos
    routes.forEach((route) => {
      getOrders(user.id!, route.title);
    });
  }, [isFocused]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#e2e2e2" }}
          activeColor="black"
          inactiveColor="gray"
          scrollEnabled={true}
          style={styles.tabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  backgroundImage: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  tabBar: {
    paddingTop: 10,
    backgroundColor: "white",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
