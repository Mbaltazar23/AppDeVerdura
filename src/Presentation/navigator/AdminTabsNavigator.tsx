import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AdminOrderStackNavigator } from "./AdminOrderStackNavigator";
import { AdminCategoryNavigator } from "./AdminCategoryNavigator";
import { AdminUserNavigator } from "./AdminUserNavigator";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="AdminCategoryNavigator"
        component={AdminCategoryNavigator}
        options={({ navigation, route }) => ({
          title: "Categorias",
          tabBarLabel: "Categorias",
          tabBarIcon: () => (
            <Image
              source={require("../../../assets/list.png")}
              style={{ width: 25, height: 25 }}
            />
          ),

        })}
      />
      <Tab.Screen
        name="AdminOrderStackNavigator"
        component={AdminOrderStackNavigator}
        options={{
          title: "Pedidos",
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/orders.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AdminUserNavigator"
        component={AdminUserNavigator}
        options={{
          title: "Usuarios",
          tabBarLabel: "Usuarios",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/user.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileInfoScreen"
        component={ProfileInfoScreen}
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/user_menu.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
