import { StyleSheet } from "react-native";

const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "0%",
  },
  form: {
    width: "100%",
    height: "66%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 10,
  },
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 15,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  formRegisterText: {
    fontStyle: "italic",
    color: "green",
    borderBottomWidth: 1,
    borderBottomColor: "green",
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "10%",
    alignItems: "center",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  loading: {
    bottom: 0,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
});

export default RegisterStyles;
