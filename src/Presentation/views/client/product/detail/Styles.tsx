import { StyleSheet } from "react-native";

const ClientProductDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1, // Agrega esta propiedad
  },
  imageContainer: {
    marginTop: 60,
    marginBottom:30,
    width: 500,
    height: 300,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '50%',
    height: '95%',
    borderRadius: 100,
  },
  productDetail: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  productInfo: {
    padding: 30,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginTop: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  descriptionTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  descriptionContent: {
    fontSize: 13,
    marginTop: 5,
  },
  productActions: {
    flexDirection: "row",
    height: 30,
    paddingHorizontal: 30,
  },
  actionLess: {
    backgroundColor: "#3a3a3a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  actionAdd: {
    backgroundColor: "#3a3a3a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  actionText: {
    color: "white",
    fontSize: 15,
  },
  quantity: {
    backgroundColor: "#3a3a3a",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  buttonAdd: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  backImage: {
    height: 40,
    width: 40,
  },
});

export default ClientProductDetailStyles;
