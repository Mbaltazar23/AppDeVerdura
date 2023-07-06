import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminOrderDetailScreen } from "../views/admin/order/detail/OrderDetail";
import { AdminOrderListScreen } from "../views/admin/order/list/OrderList";
import { OrderProvider } from "../context/OrderContext";
import { Order } from "../../Domain/entities/Order";

export type AdminOrderStackParamList = {
  AdminOrderListScreen: undefined;
  AdminOrderDetailScreen: { order: Order };
};

const Stack = createNativeStackNavigator<AdminOrderStackParamList>();

export const AdminOrderStackNavigator = () => {
  return (
    <OrderStatus>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AdminOrderListScreen"
          component={AdminOrderListScreen}
        />
        <Stack.Screen
          name="AdminOrderDetailScreen"
          component={AdminOrderDetailScreen}
          options={{
            headerShown: true,
            title: "Detalle de la Orden",
          }}
        />
      </Stack.Navigator>
    </OrderStatus>
  );
};

const OrderStatus = ({ children }: any) => {
  return <OrderProvider>{children}</OrderProvider>;
};
