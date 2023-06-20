import React, { useState } from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { ClientShoppingBagScreen } from "../views/client/shopping_bag/ShoppingBag";
import { ClientAddressListScreen } from "../views/client/address/list/AddressList";
import { ClientAddressCreateScreen } from "../views/client/address/create/AddressCreate";
import { ClientAddressMapScreen } from "../views/client/address/map/AddressMap";
import { ClientProductSearchScreen } from "../views/client/product/search/ProductSearch";
import { Product } from "../../Domain/entities/Product";
import { MenuModal } from "../components/MenuModal";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";

export type ClientStackParamList = {
  ClientCategoryListScreen: undefined;
  ClientProductListScreen: { id_category: string };
  ClientProductDetailScreen: { product: Product };
  ClientProductSearchScreen: undefined;
  ClientShoppingBagScreen: undefined;
  ClientAddressListScreen: undefined;
  ClientAddressCreateScreen:
    | { refPoint: string; latitude: number; longitude: number }
    | undefined;
  ClientAddressMapScreen: undefined;
  ProfileInfoScreen: undefined;
};

const Stack = createNativeStackNavigator<ClientStackParamList>();

export const ClientStackNavigator = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <ShoppingBagState>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="ClientCategoryListScreen"
          component={ClientCategoryListScreen}
          options={({ navigation }) => ({
            title: "Categorias",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientAddressListScreen")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/arrow_down.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{ color: "white" }}>Crear Dirección</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={toggleMenu}>
                <Image
                  source={require("../../../assets/lateral.png")}
                  style={{ width: 20, height: 18, marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ClientProductListScreen"
          component={ClientProductListScreen}
          options={({ navigation }) => ({
            title: "Productos",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientAddressCreateScreen")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/arrow_down.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{ color: "white" }}>Crear Dirección</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ClientProductDetailScreen"
          options={{ headerShown: false }}
          component={ClientProductDetailScreen}
        />
        <Stack.Screen
          name="ClientProductSearchScreen"
          component={ClientProductSearchScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientShoppingBagScreen")}
              >
                <Image
                  source={require("../../../assets/shopping_cart.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientAddressCreateScreen")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/arrow_down.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={{ color: "white" }}>Crear Dirección</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ClientShoppingBagScreen"
          component={ClientShoppingBagScreen}
          options={{
            title: "Mi orden",
          }}
        />
        <Stack.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
        <Stack.Screen
          name="ClientAddressListScreen"
          component={ClientAddressListScreen}
          options={({ navigation }) => ({
            title: "Mis Direcciones",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientAddressCreateScreen")}
              >
                <Image
                  source={require("../../../assets/add.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ClientAddressCreateScreen"
          component={ClientAddressCreateScreen}
          options={{
            title: "Nueva Direccion",
          }}
        />
        <Stack.Screen
          name="ClientAddressMapScreen"
          component={ClientAddressMapScreen}
          options={{
            title: "Ubica tu direccion en el mapa",
          }}
        />
      </Stack.Navigator>
      <MenuModal isVisible={isMenuVisible} toggleMenu={toggleMenu} />
    </ShoppingBagState>
  );
};

const ShoppingBagState = ({ children }: any) => {
  return <ShoppingBagProvider>{children}</ShoppingBagProvider>;
};
