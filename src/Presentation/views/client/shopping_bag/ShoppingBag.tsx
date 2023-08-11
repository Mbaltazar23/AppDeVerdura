import React from "react";
import { FlatList, Text, View } from "react-native";
import { ClientStackParamList } from "../../../navigator/ClientStackNavigator";
import { ActionToCartMessage } from "../../../components/CustomMessageCart";
import { StackScreenProps } from "@react-navigation/stack";
import { ShoppingBagItem } from "./Item";
import { RoundedButton } from "../../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientShoppingBagScreen"> {}

export const ClientShoppingBagScreen = ({ navigation }: Props) => {
  const {
    shoppingBag,
    total,
    addItem,
    subtractItem,
    deleteItem,
    getShowMessage,
    showMessage,
    setShowMessage,
  } = useViewModel();

  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingBag}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <ShoppingBagItem
            product={item}
            addItem={addItem}
            substractItem={subtractItem}
            deleteItem={deleteItem}
            showMessage={getShowMessage}
          />
        )}
      />
      <View style={styles.totalToPay}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalMoney}>
            ${total.toLocaleString("en-US")}
          </Text>
        </View>
        <View style={styles.buttonAdd}>
          <RoundedButton
            text="CONFIRMAR ORDEN"
            onPress={() => navigation.navigate("ClientAddressListScreen")}
          />
        </View>
      </View>
      {showMessage && (
        <ActionToCartMessage
          onAnimationEnd={() => setShowMessage(false)}
          message="Producto Eliminado Exitosamente !!"
        />
      )}
    </View>
  );
};
