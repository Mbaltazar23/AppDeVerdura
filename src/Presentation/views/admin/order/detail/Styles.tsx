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
    backgroundColor: "rgba(198, 227, 156, 1)", // Color verde anaranjado sin transparencia
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 35,
    elevation: 14, // Agregar sombreado
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
  paymentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    bottom: 2,
    color: "black",
  },
  paymentMethod: {
    fontSize: 17,
    color: "black",
    marginLeft: 5, // Espacio entre el texto y el valor
    bottom: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1, // Ajusta la opacidad para aumentar el efecto de difuminado
  },
});

export default AdminOrderDetailStyles;
