import { StyleSheet } from "react-native";
import { MyColors } from "../../../theme/AppTheme";

const ClientTermsConditionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop:22,
    textAlign: "center",
    color: MyColors.primary,
  },
  
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    textAlign: "justify",
  },
  finalMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "justify",
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 40,
    padding: 12,
    backgroundColor: MyColors.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default ClientTermsConditionsStyles;
