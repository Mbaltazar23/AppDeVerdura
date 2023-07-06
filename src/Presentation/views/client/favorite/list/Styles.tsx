import {  StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const ClientFavoriteProductsStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 10,
  },
  searchInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInputPlaceholder: {
    color: "gray",
  },
  searchIcon: {
    marginRight: 10,
    color: MyColors.primary,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: MyColors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  categoryListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
});

export default ClientFavoriteProductsStyles;
