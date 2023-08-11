import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChangePasswordScreen } from "../views/change-password/ChangePassword";
import { ProfileUpdateScreen } from "../views/profile/update/ProfileUpdate";
import { ClientTabsNavigator } from "./ClientTabsNavigator";
import { ResetPasswordScreen } from "../views/reset-password/ResetPassword";
import { AdminTabsNavigator } from "./AdminTabsNavigator";
import { RegisterScreen } from "../views/register/Register";
import { UserProvider } from "../context/UserContext";
import { HomeScreen } from "../views/home/Home";
import { LoginScreen } from "../views/login/Login";
import { User } from "../../Domain/entities/User";

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  ChangePasswordScreen: undefined;
  AdminTabsNavigator: undefined;
  ClientTabsNavigator: undefined;
  ProfileUpdateScreen: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
  return (
    <UserState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
            title: "Recuperar Password",
          }}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{
            headerShown: false,
            title: "Resetear Password",
          }}
        />
        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
        />
        <Stack.Screen
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
        />
        <Stack.Screen
          name="ProfileUpdateScreen"
          component={ProfileUpdateScreen}
          options={{
            headerShown: true,
            title: "Actualizar datos",
          }}
        />
      </Stack.Navigator>
    </UserState>
  );
};

const UserState = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};
