import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const AdminOrderDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  products: {
    width: "100%",
    height: "50%",
    overflow: "hidden", // Ocultar contenido que se desborda
  },
  info: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    elevation: 10, // Agregar sombreado
    overflow: "hidden", // Ocultar contenido que se desborda
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 35,
  },
  infoText: {
    flex: 1,
  },
  infoImage: {
    width: 25,
    height: 25,
  },
  infoTitle: {
    color: "black",
  },
  infoDescription: {
    color: "gray",
    fontSize: 13,
    marginTop: 3,
  },
  deliveries: {
    fontWeight: "bold",
    marginTop: 15,
    color: MyColors.primary,
  },
  totalInfo: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    width: "30%",
  },
  dropDown: {
    marginTop: 20,
  },
});

export default AdminOrderDetailStyles;
