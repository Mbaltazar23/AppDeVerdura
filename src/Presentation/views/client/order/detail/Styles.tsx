import { StyleSheet } from "react-native";

const ClientOrderDetailStyles = StyleSheet.create({
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
  totalInfo: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    width: "50%",
  },
  paymentDropdown: {
    marginBottom: 10,
    marginTop: 0,
  },
  paymentLabelDropdown: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    margin: 6,
  },
  paymentPicker: {
    backgroundColor: "white",
    width: "100%", // Ajusta el ancho del picker
  },
  paymentButtonContainer: {
    width: "100%", // Ajusta el ancho del botón
    marginTop: 10,
    bottom: 10,
  },
  paymentSection: {
    marginTop: 30,
    flexDirection: "column", // Cambiado a columna para alinear elementos verticalmente
  },
  paymentInfo: {
    flexDirection: "row", // Cambiado a fila para alinear elementos horizontalmente
    alignItems: "center", // Alinear elementos verticalmente
    marginBottom: 10, // Espacio entre el valor del objeto y el botón
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
    bottom:2
  },
  dropDown: {
    width: "90%",
    marginTop: 20,
  },
  buttonContainer: {
    width: "90%", // Cambiado el ancho
    marginTop: 15, // Margen adicional
    bottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1,
  },
});

export default ClientOrderDetailStyles;
