import { StyleSheet } from "react-native";

const ClientAddressMapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageLocation: {
    height: 65,
    width: 65,
    justifyContent: "center",
    position: "absolute",
  },
  refPoint: {
    position: "absolute",
    backgroundColor: "#d4d4d4",
    width: "70%",
    paddingVertical: 4,
    top: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  refPointText: {
    textAlign: "center",
  },
  buttonRefPoint: {
    position: "absolute",
    bottom: 40,
    width: "40%",
  },
  inputContainer: {
    position: "absolute",
    top: 120,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    width: 80,
  },
});

export default ClientAddressMapStyles;
