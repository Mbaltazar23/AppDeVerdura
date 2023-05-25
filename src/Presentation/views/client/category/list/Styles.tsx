import {  StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const CategoryListStyles = StyleSheet.create({
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
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
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
  },
});

export default CategoryListStyles;
