import { StyleSheet } from "react-native";

const ClientShoppingBagStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  totalInfo: {
    alignItems: "center",
  },
  totalToPay: {
    flexDirection: "row",
    height: 95,
    backgroundColor: "f2f2f2",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  totalMoney:{
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonAdd: {
    width: "50%",
  },
});

export default ClientShoppingBagStyles;
