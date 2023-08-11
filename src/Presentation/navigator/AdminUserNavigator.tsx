import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminUserListScreen } from "../views/admin/user/list/UserList";
import { User } from "../../Domain/entities/User";
import { AdminUserViewScreen } from "../views/admin/user/detail/UserDetail";

export type UserStackParamList = {
  AdminUserListScreen: undefined;
  AdminUserViewScreen: { user: User };
};

const Stack = createNativeStackNavigator<UserStackParamList>();

export const AdminUserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AdminUserListScreen"
        component={AdminUserListScreen}
        options={{
          headerShown: true,
          title: "    Ultimos usuarios",
        }}
      />
      <Stack.Screen
        name="AdminUserViewScreen"
        component={AdminUserViewScreen}
        options={{
          headerShown: true,
          title: "Detalle del Usuario",
        }}
      />
    </Stack.Navigator>
  );
};
