import { StyleSheet } from "react-native";

const ClientOrderPayTransbankStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  ticketImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 10,
    margin: 20,
  },
  approvedText: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardTitleProducts:{
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    bottom:8
  },
  clientImage: {
    width: "28%",
    height: "28%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 50,
    marginBottom: 6,
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    margin:6
  },
  clientDetails: {
    flex: 1,
    marginLeft: 16,
  },
  transbankInfo: {
    alignItems: "center",
  },
  subtext: {
    textDecorationLine: "underline",
  },
  productsContainer: {
    marginBottom: 0, // Aumenté el margen inferior para separarlo más del título
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  tableHeaderText: {
    fontWeight: "bold",
    flex: 1,
    marginLeft:10,
    bottom:1,
    margin:2
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: "20%",
    height: "20%",
    aspectRatio: 1,
    resizeMode: "contain",
    marginRight: 16,
  },
  productPrice: {
    flex: 1,
    marginLeft: 20,
  },
  productQuantity: {
    flex: 1,
    marginLeft: 20,
  },
  productSubtotal: {
    flex: 1,
    marginLeft: 20,
  },
});

export default ClientOrderPayTransbankStyles;
