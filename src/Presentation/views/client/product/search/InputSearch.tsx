import React from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MyColors } from "../../../../theme/AppTheme";

interface ProductSearchInputProps {
  onSearch: (searchText: string) => void;
  searchText: string;
}

export const ProductSearchInput = ({
  onSearch,
  searchText,
}: ProductSearchInputProps) => {
  const handleSearch = () => {
    if (searchText.trim() !== "") {
      onSearch(searchText);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Busque un producto"
        style={styles.input}
        value={searchText}
        onChangeText={onSearch}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Icon name="search" size={28} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: MyColors.primary,
    overflow: "hidden", // Añade esta línea para ocultar el contenido que se desborda
  },
  searchIcon: {
    marginLeft: "auto", // Coloca el icono a la derecha utilizando marginLeft: 'auto'
    marginStart: 12,
    color: MyColors.primary,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 0, // Cambia el borderWidth a 0 para eliminar la línea del input
    color: MyColors.primary,
  },
});
