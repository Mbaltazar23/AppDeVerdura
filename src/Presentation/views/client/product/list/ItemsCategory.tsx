import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Product } from "../../../../../Domain/entities/Product";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { Category } from "../../../../../Domain/entities/Category";
import { MyColors } from "../../../../theme/AppTheme";
import { CardItemProduct } from "./Item";

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string | null;
  products: Product[];
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientProductListScreen",
    undefined
  >;
  onCategorySelected: (categoryId: string) => void;
}

enum SortOption {
  NameAscending = "Nombre: A-Z",
  NameDescending = "Nombre: Z-A",
  PriceHighToLow = "Precio: de mayor a menor",
  PriceLowToHigh = "Precio: de menor a mayor",
}

export const ItemsCategoryList = ({
  categories,
  selectedCategoryId,
  products,
  navigation,
  onCategorySelected,
}: CategoryListProps) => {
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (selectedCategoryId === null && categories.length > 0) {
      onCategorySelected(categories[0].id!);
    }
  }, [categories, selectedCategoryId, onCategorySelected]);

  const handleCategorySelected = (categoryId: string) => {
    onCategorySelected(categoryId);
  };

  const handleSortOptionSelected = (option: SortOption) => {
    setSelectedSortOption(option);
    setShowOptions(false);
  };

  const sortProducts = (option: SortOption) => {
    switch (option) {
      case SortOption.NameAscending:
        return products.slice().sort((a, b) => a.name.localeCompare(b.name));
      case SortOption.NameDescending:
        return products.slice().sort((a, b) => b.name.localeCompare(a.name));
      case SortOption.PriceHighToLow:
        return products.slice().sort((a, b) => b.price - a.price);
      case SortOption.PriceLowToHigh:
        return products.slice().sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(selectedSortOption || SortOption.NameAscending);

  const filteredProducts = selectedCategoryId
    ? sortedProducts.filter((product) => product.id_category === selectedCategoryId)
    : [];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            activeOpacity={0.8}
            onPress={() => handleCategorySelected(category.id!)}
          >
            <View
              style={[
                styles.categoryItem,
                { opacity: category.id === selectedCategoryId ? 1 : 0.5 },
              ]}
            >
              <View
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      category.id === selectedCategoryId
                        ? MyColors.primary
                        : MyColors.secondary,
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: category.image }}
                    style={styles.image}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    category.id === selectedCategoryId &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.categoryHeader}>
        <Text style={styles.selectedCategoryName}>
          {categories.find((category) => category.id === selectedCategoryId)?.name}
        </Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowOptions(true)}
        >
          <Text style={styles.selectButtonText}>Ordenar Por</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredProducts}
        renderItem={({ item }) => (
          <CardItemProduct product={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id!.toString()}
      />

      {/* Modal de opciones de ordenamiento */}
      <Modal visible={showOptions} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  selectedSortOption === SortOption.NameAscending && styles.selectedSortOption,
                ]}
                onPress={() => handleSortOptionSelected(SortOption.NameAscending)}
              >
                <Text style={styles.sortOptionText}>{SortOption.NameAscending}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  selectedSortOption === SortOption.NameDescending && styles.selectedSortOption,
                ]}
                onPress={() => handleSortOptionSelected(SortOption.NameDescending)}
              >
                <Text style={styles.sortOptionText}>{SortOption.NameDescending}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  selectedSortOption === SortOption.PriceHighToLow && styles.selectedSortOption,
                ]}
                onPress={() => handleSortOptionSelected(SortOption.PriceHighToLow)}
              >
                <Text style={styles.sortOptionText}>{SortOption.PriceHighToLow}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  selectedSortOption === SortOption.PriceLowToHigh && styles.selectedSortOption,
                ]}
                onPress={() => handleSortOptionSelected(SortOption.PriceLowToHigh)}
              >
                <Text style={styles.sortOptionText}>{SortOption.PriceLowToHigh}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryItem: {
    marginBottom: 10,
    marginRight: 10,
  },
  categoryButton: {
    height: 45,
    width: 120,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  imageContainer: {
    height: 35,
    width: 35,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    borderRadius: 28,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  selectedCategoryText: {
    color: "white",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  selectedCategoryName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  selectButtonText: {
    color: "black",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    minWidth: 200,
  },
  sortOption: {
    paddingVertical: 10,
  },
  selectedSortOption: {
    backgroundColor: MyColors.primary,
  },
  sortOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

