import { StyleSheet } from "react-native";

const ClientAddressCreateStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    paddingTop: 50,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },

  form: {
    backgroundColor: "white",
    height: "65%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    marginTop:30,
    bottom: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
});

export default ClientAddressCreateStyles;
