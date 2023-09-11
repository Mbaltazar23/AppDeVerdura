import {StyleSheet} from "react-native";
import {MyColors} from "../../../../theme/AppTheme";

const CategoryListStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingHorizontal: 30,
        backgroundColor: MyColors.primary,
        height: "14%",
        justifyContent: "flex-end"
    },
    gradient: {
        backgroundColor: `linear-gradient(90deg, ${
            MyColors.secondary
        } 50%, ${
            MyColors.primary
        } 50%)`,
        paddingHorizontal: 0,
        paddingBottom: 20
    },
    title: {
        fontSize: 22,
        color: "white",
        marginVertical: 5,
        right: 4,
        textAlign: "center"
    },
    titleOrange: {
        fontSize: 22,
        color: "orange", // Usar el color naranja
        marginVertical: 5,
        right: 4,
        textAlign: "center"
    },
    titleWhite: {
        fontSize: 22,
        color: "white",
        marginVertical: 5,
        right: 4,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 14,
        color: "white",
        textAlign: "center"
    },
    orangeStripe: {
        height: 3,
        width: 50,
        backgroundColor: "orange", // Color naranja
        alignSelf: "center",
        marginTop: 5
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    searchInputContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        // Estilos adicionales para el contenedor del campo de búsqueda
    },
    searchInputPlaceholder: {
        color: "gray",
        // Estilos adicionales para el texto de marcador de posición del campo de búsqueda
    },
    searchIcon: {
        marginRight: 10,
        color: MyColors.primary
    },
    categoryListContainer: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default CategoryListStyles;
