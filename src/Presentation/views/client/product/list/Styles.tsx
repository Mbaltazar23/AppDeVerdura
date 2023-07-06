import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const CategoryListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: MyColors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 2, // Reducir el margen superior para acercarlo al título
  },
  searchIcon: {
    marginRight: 10,
    color: MyColors.primary,
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
  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: MyColors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  categoryListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 22, // Ajusta este valor según tus preferencias para obtener el espacio deseado
    marginBottom: 0, // Agrega un margen inferior para separar el listado de elementos de categoría del resto de la pantalla
  },
  selectedCategoryContainer: {
    backgroundColor: MyColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCategoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  selectedCategoryProductCount: {
    fontSize: 14,
    color: "white",
  },
});

export default CategoryListStyles;
