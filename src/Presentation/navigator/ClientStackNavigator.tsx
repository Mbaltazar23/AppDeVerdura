import React, { useState } from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import { ClientFavoriteProductSearchScreen } from "../views/client/favorite/search/FavoriteProductSearch";
import { ClientFavoriteProductsScreen } from "../views/client/favorite/list/FavoriteProducts";
import { ClientTermsConditionsScreen } from "../views/client/terms/TermsConditions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { ClientAddressCreateScreen } from "../views/client/address/create/AddressCreate";
import { ClientProductSearchScreen } from "../views/client/product/search/ProductSearch";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientShoppingBagScreen } from "../views/client/shopping_bag/ShoppingBag";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientStatusOrderScreen } from "../views/client/address/status/StatusOrder";
import { ClientAddressListScreen } from "../views/client/address/list/AddressList";
import { ClientAddressMapScreen } from "../views/client/address/map/AddressMap";
import { ShoppingBagProvider } from "../context/ShoppingBagContext";
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo";
import { MenuModal } from "../components/MenuModal";
import { Product } from "../../Domain/entities/Product";
import { Order } from "../../Domain/entities/Order";

export type ClientStackParamList = {
  ClientCategoryListScreen: undefined;
  ClientProductListScreen: { id_category: string };
  ClientProductDetailScreen: { product: Product };
  ClientProductSearchScreen: undefined;
  ClientShoppingBagScreen: undefined;
  ClientTermsConditionsScreen: undefined;
  ClientAddressListScreen: undefined;
  ClientAddressCreateScreen:
    | { refPoint: string; latitude: number; longitude: number }
    | undefined;
  ClientAddressMapScreen: undefined;
  ClientStatusOrderScreen: {order:Order};
  ClientFavoriteProductsScreen: undefined;
  ClientFavoriteProductSearchScreen: undefined;
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
          name="ClientTermsConditionsScreen"
          component={ClientTermsConditionsScreen}
          options={{
            title: "Términos y condiciones",
          }}
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

        <Stack.Screen
          name="ClientFavoriteProductsScreen"
          component={ClientFavoriteProductsScreen}
          options={{
            title: "Mis productos Favoritos",
          }}
        />

        <Stack.Screen
          name="ClientFavoriteProductSearchScreen"
          component={ClientFavoriteProductSearchScreen}
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
          name="ClientStatusOrderScreen"
          component={ClientStatusOrderScreen}
          options={{ headerShown: false }}
        />    
        

      </Stack.Navigator> 
               <MenuModal isVisible={isMenuVisible} toggleMenu={toggleMenu} />

    </ShoppingBagState>
  );
};

const ShoppingBagState = ({ children }: any) => {
  return <ShoppingBagProvider>{children}</ShoppingBagProvider>;
};
