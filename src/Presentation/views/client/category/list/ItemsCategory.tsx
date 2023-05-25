import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GetProductsByCategoryUseCase } from "../../../../../Domain/useCases/product/GetProductsByCategory";import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { Category } from "../../../../../Domain/entities/Category";
import { Product } from "../../../../../Domain/entities/Product";
import { MyColors } from "../../../../theme/AppTheme";
import { Card } from "../products/Card";

// Componente para renderizar un elemento de categoría en la lista
interface CategoryListItemProps {
  category: Category;
  onViewMore: () => void;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

const CategoryListItem = ({ category, navigation }: CategoryListItemProps) => {
  return (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ClientProductListScreen", {
            id_category: category.id!,
          })
        }
      >
        <Text style={styles.viewMoreText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para renderizar una sección de categoría con sus productos asociados
interface CategorySectionProps {
  category: Category;
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

const CategorySection = ({ category, navigation }: CategorySectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await GetProductsByCategoryUseCase(category.id!);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [category.id]);

  return (
    <View style={styles.categorySection}>
      <CategoryListItem
        category={category}
        onViewMore={() =>
          navigation.navigate("ClientProductListScreen", {
            id_category: category.id!,
          })
        }
        navigation={navigation}
      />
      <ScrollView horizontal>
        {products.map((product) => (
          <Card key={product.id} product={product} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

// Componente principal para renderizar la lista de categorías y sus secciones
interface CategoryListProps {
  categories: Category[];
  navigation: StackNavigationProp<
    ClientStackParamList,
    "ClientCategoryListScreen",
    undefined
  >;
}

export const CategoryList = ({ categories, navigation }: CategoryListProps) => {
  return (
    <ScrollView>
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

// Estilos para los componentes
const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor: "#0000",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewMoreText: {
    fontSize: 16,
    color: MyColors.primary,
  },
  categorySection: {
    marginBottom: 10,
  },
});
