import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { ActionToCartMessage } from "../../../../components/CustomMessageCart";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryList } from "./ItemsCategory";
import Icon from "react-native-vector-icons/MaterialIcons";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientCategoryListScreen"> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const {
    categories,
    getCategories,
    showMessage,
    handleShowMessage,
    setShowMessage,
  } = useViewModel();

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearchPress = () => {
    navigation.navigate("ClientProductSearchScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.gradient}>
          <Text style={styles.title}>
            <Text style={styles.titleOrange}>Bienvenido a </Text>
            <Text style={styles.titleWhite}>De Verdura </Text>
          </Text>
          <Text style={styles.subtitle}>
            Desde el agro a la puerta de tu casa
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={handleSearchPress}
      >
        <Icon name="search" size={28} style={styles.searchIcon} />
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchInputPlaceholder}>Busque un producto</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.categoryListContainer}>
        <CategoryList
          categories={categories}
          navigation={navigation}
          showMessage={handleShowMessage} // Pasamos la función para mostrar el mensaje al componente CategoryList
        />
      </View>
      {showMessage && ( // Mostramos el mensaje solo si showMessage es true
        <ActionToCartMessage
          onAnimationEnd={() => setShowMessage(false)} // Reiniciamos el estado de showMessage
          message="Producto Agregado Exitosamente!"
        />
      )}
    </SafeAreaView>
  );
};
