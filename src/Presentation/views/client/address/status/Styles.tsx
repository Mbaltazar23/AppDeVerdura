import { StyleSheet } from "react-native";

const ClientOrderStatusStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 80,
    height: 80,
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  info: {
    fontSize: 13,
    marginTop: 10,
    paddingHorizontal: 40,
    textAlign: "center",
  },
  infoHighlight: {
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 40,
    textAlign: "center",
    fontWeight: "bold", // Añadir negrita para hacerlo más llamativo
    color: "#FF5722", // Cambiar el color del texto a naranja (#FF5722)
  },
  // Estilos para la tabla
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCellTitle: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
  },
  tableCellValue: {
    fontWeight: "bold",
  },
  // Estilos adicionales para los productos
  productTitle: {
    marginTop: 20,
  },
  productCell: {
    flex: 1,
    textAlign: "left",
    paddingVertical: 5,
  },
  // Estilos para el botón
  button: {
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default ClientOrderStatusStyles;
