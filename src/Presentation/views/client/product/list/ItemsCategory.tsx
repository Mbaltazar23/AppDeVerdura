import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActionToCartMessage } from "../../../../components/CustomMessageCart";
import { CardItemProduct } from "./Item";
import { SortModal } from "../../../../components/SortProductList";
import { MyColors } from "../../../../theme/AppTheme";
import { Category } from "../../../../../Domain/entities/Category";
import { Product } from "../../../../../Domain/entities/Product";

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string | any;
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
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOption | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (selectedCategoryId !== "") {
      onCategorySelected(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleCategorySelected = (categoryId: string) => {
    onCategorySelected(categoryId);
  };

  const handleSortOptionSelected = (option: SortOption) => {
    setSelectedSortOption(option);
    setShowOptions(false);
  };

  const handleAddToCart = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Ocultar el mensaje después de 10 segundos
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

  const sortedProducts = sortProducts(
    selectedSortOption || SortOption.NameAscending
  );

  const filteredProducts = selectedCategoryId
    ? sortedProducts.filter(
        (product) => product.id_category === selectedCategoryId
      )
    : [];

  return (
    <View style={styles.container}>
      <View>
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
      </View>
      <View style={styles.productListContainer}>
        <View style={styles.categoryHeader}>
          <Text style={styles.selectedCategoryName}>
            {
              categories.find((category) => category.id === selectedCategoryId)
                ?.name
            }
          </Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowOptions(true)}
          >
            <Text style={styles.selectButtonText}>Ordenar Por</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          data={filteredProducts}
          renderItem={({ item }) => (
            <CardItemProduct
              product={item}
              navigation={navigation}
              onAddToCart={handleAddToCart}
            />
          )}
          keyExtractor={(item) => item.id!.toString()}
          contentContainerStyle={styles.productList} // Agrega este estilo para mantener el diseño de los productos
        />
      </View>

      {/* Modal de opciones de ordenamiento */}
      <SortModal
        visible={showOptions}
        selectedSortOption={selectedSortOption}
        onClose={() => setShowOptions(false)}
        onSelectSortOption={handleSortOptionSelected}
      />

      {showMessage && (
        <ActionToCartMessage
          onAnimationEnd={() => setShowMessage(false)}
          message="Producto Agregado Exitosamente!"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryItem: {
    marginBottom: 5,
    marginRight: 5,
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
    borderRadius: 24,
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
    marginVertical: 10,
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
  productListContainer: {
    flex: 1,
    paddingHorizontal: 1,
    paddingTop: 5,
  },
  productList: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
