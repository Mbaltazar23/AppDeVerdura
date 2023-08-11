import { StyleSheet } from "react-native";

const AdminUserViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      imageBackground: {
        width: "100%",
        height: "100%",
        opacity: 0.7,
        position: "absolute",
      },
      form: {
        width: "100%",
        height:'50%',
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
      },
      formInfo: {
        flexDirection: "row",
        alignItems: "center",
      },
      formContent: {
        marginLeft: 15,
      },
      formImage: {
        height: 30,
        width: 30,
      },
      formTextDescription: {
        fontSize: 12,
        color: "gray",
      },
      logoContainer: {
        position: "absolute",
        alignSelf: "center",
        top: "14%",
      },
      logoImage: {
        width: 200, // Tamaño ajustable para la imagen
        height:200, // Tamaño ajustable para la imagen
        resizeMode: "contain",
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 5,
      },
});

export default AdminUserViewStyles;
