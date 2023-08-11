import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { TabView, TabBar } from "react-native-tab-view";
import { OrderListItem } from "./Item";
import useViewModel from "./ViewModel";

interface Props {
  status: string;
}

const OrderListView = ({ status }: Props) => {
  const { ordersPayed, ordersDispatched, ordersDelivery, getOrders } =
    useViewModel();

  const navigation =
    useNavigation<
      StackNavigationProp<AdminOrderStackParamList, "AdminOrderListScreen">
    >();

  useEffect(() => {
    getOrders(status);
  }, []);

  return (
    <ImageBackground
      source={require("../../../../../../assets/fondo-difuminado.jpg")}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.content}>
        <FlatList
          data={
            status === "PAGADO"
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
        />
      </View>
    </ImageBackground>
  );
};

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "first":
      return <OrderListView status="PAGADO" />;
    case "second":
      return <OrderListView status="DESPACHADO" />;
    case "third":
      return <OrderListView status="ENTREGADO" />;
    default:
      return <OrderListView status="PAGADO" />;
  }
};

export const AdminOrderListScreen = () => {
  const layout = useWindowDimensions();
  const { getOrders } = useViewModel();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "PAGADO" },
    { key: "second", title: "DESPACHADO" },
    { key: "third", title: "ENTREGADO" },
  ]);

  const isFocused = useIsFocused(); // Nueva adición

  useEffect(() => {
    if (isFocused) {
      // Si la pantalla está enfocada (accedida desde la pestaña de pedidos), obtén todos los pedidos
      routes.forEach((route) => {
        getOrders(route.title);
      });
    }
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
          style={{
            paddingTop: 10,
            backgroundColor: "white",
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
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
