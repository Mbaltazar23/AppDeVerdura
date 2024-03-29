import { ClientOrderPayTransbankScreen } from "../views/client/order/transbank-pay/TranbankPay";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientOrderDetailScreen } from "../views/client/order/detail/OrderDetail";
import { ClientOrderListScreen } from "../views/client/order/list/OrderList";
import { OrderProvider } from "../context/OrderContext";
import { Order } from "../../Domain/entities/Order";

export type ClientOrderStackParamList = {
  ClientOrderListScreen: undefined;
  ClientOrderDetailScreen: { order: Order };
  ClientOrderPayTransbankScreen: { order: Order };
};

const Stack = createNativeStackNavigator<ClientOrderStackParamList>();

export const ClientOrderStackNavigator = () => {
  return (
    <OrderStatus>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ClientOrderListScreen"
          component={ClientOrderListScreen}
        />
        <Stack.Screen
          name="ClientOrderDetailScreen"
          component={ClientOrderDetailScreen}
          options={{
            headerShown: true,
            title: "Detalle de la Orden",
          }}
        />
        <Stack.Screen
          name="ClientOrderPayTransbankScreen"
          component={ClientOrderPayTransbankScreen}
        />
      </Stack.Navigator>
    </OrderStatus>
  );
};

const OrderStatus = ({ children }: any) => {
  return <OrderProvider>{children}</OrderProvider>;
};
