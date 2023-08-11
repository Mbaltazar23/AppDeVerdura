import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { GetProductsByCategoryUseCase } from "../../../../../Domain/useCases/product/GetProductsByCategory";
import { CELL_NUMBER_WHATSAPP } from "../../../../constants/CellNumberWhatsapp";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { WhatsAppButton } from "../../../../components/CustomBtnWhatsapp";
import { Category } from "../../../../../Domain/entities/Category";
import { MyColors } from "../../../../theme/AppTheme";
import { Product } from "../../../../../Domain/entities/Product";
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
  showMessage: () => void; // Agregamos la función para mostrar el mensaje
}

const CategoryListItem = ({
  category,
  onViewMore,
}: CategoryListItemProps) => {
  return (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <TouchableOpacity onPress={onViewMore}>
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
  showMessage: () => void; // Pasamos la función para mostrar el mensaje
}

const CategorySection = ({
  category,
  navigation,
  showMessage,
}: CategorySectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      const fetchedProducts = await GetProductsByCategoryUseCase(category.id!);

      if (isMounted) {
        setProducts(fetchedProducts);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [category.id]);

  const handleAddToCart = () => {
    showMessage(); // Llamamos a la función para mostrar el mensaje
  };

  if (loading) {
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
          showMessage={showMessage}
        />
        <View style={styles.loadingContainer}>
          <Text>Cargando productos...</Text>
        </View>
      </View>
    );
  }

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
        showMessage={showMessage}
      />
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <Card
            product={item}
            navigation={navigation}
            onAddToCart={handleAddToCart}
          />
        )}
      />
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
  showMessage: () => void; // Agregamos la función para mostrar el mensaje
}

export const CategoryList = ({
  categories,
  navigation,
  showMessage,
}: CategoryListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <CategorySection
            category={item}
            navigation={navigation}
            showMessage={showMessage}
          />
        )}
      />
      <View style={styles.floatingButtonContainer}>
        <WhatsAppButton phoneNumber={CELL_NUMBER_WHATSAPP} />
      </View>
    </View>
  );
};

// Estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: MyColors.primary,
    borderRadius: 60,
    padding: 10,
    elevation: 10,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
});
