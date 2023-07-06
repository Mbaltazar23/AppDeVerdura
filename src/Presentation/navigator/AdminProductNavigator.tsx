import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminProductCreateScreen } from "../views/admin/product/create/ProductCreate";
import { AdminProductUpdateScreen } from "../views/admin/product/update/ProductUpdate";
import { AdminProductListScreen } from "../views/admin/product/list/ProductList";
import { CategoryStackParamList } from "./AdminCategoryNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductProvider } from "../context/ProductContext";
import { Category } from "../../Domain/entities/Category";
import { Product } from "../../Domain/entities/Product";

export type ProductStackParamList = {
  AdminProductListScreen: { category: Category };
  AdminProductCreateScreen: { category: Category };
  AdminProductUpdateScreen: { category: Category; product: Product };
};

const Stack = createNativeStackNavigator<ProductStackParamList>();

interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminProductNavigator"> {}

export const AdminProductNavigator = ({ navigation, route }: Props) => {
  return (
    <ProductState>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AdminProductListScreen"
          component={AdminProductListScreen}
          initialParams={{ category: route.params.category }}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: "Productos",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminProductCreateScreen")}
              >
                <Image
                  source={require("../../../assets/add.png")}
                  style={{ width: 35, height: 35 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AdminProductCreateScreen"
          component={AdminProductCreateScreen}
          initialParams={{ category: route.params.category }}
          options={{
            title: "Nuevo Producto",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AdminProductUpdateScreen"
          component={AdminProductUpdateScreen}
          options={{
            title: "Actualizar Producto",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </ProductState>
  );
};

const ProductState = ({ children }: any) => {
  return <ProductProvider>{children}</ProductProvider>;
};
