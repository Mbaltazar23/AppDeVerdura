import React, { useEffect, useState } from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { OrderListItem } from "./Item";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator";
import useViewModel from "./ViewModel";

interface Props {
  status: string;
}

const OrderListView = ({ status }: Props) => {
  const {
    ordersPayed,
    ordersDispatched,
    ordersDelivery,
    getOrders,
  } = useViewModel();
  
  const navigation =
    useNavigation<
      StackNavigationProp<AdminOrderStackParamList, "AdminOrderListScreen">
    >();

  useEffect(() => {
    getOrders(status);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "PAGADO" },
    { key: "second", title: "DESPACHO" },
    { key: "third", title: "ENTREGADO" },
  ]);

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
