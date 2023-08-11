import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  logoText: {
    color: "white",
    textAlign: "center",
    marginTop: 0,
    fontFamily: "Another",
  },
  form: {
    width: "100%",
    height: "60%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  colorBtnLogin: {
    backgroundColor: "#CAF218",
  },
  formButton: {
    marginBottom: 35,
  },
  formBtnRegister: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    width: "60%",
  },
  forgotPassword: {
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});

export default HomeStyles;
