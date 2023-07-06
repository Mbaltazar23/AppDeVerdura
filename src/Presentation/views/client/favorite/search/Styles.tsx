import { StyleSheet } from "react-native";

const ProductSearchFavoriteListStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: "green",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "green",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingTop: 12,
  },
});

export default ProductSearchFavoriteListStyles;
