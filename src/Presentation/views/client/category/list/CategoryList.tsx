import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import { CategoryList } from "./ItemsCategory";
import Icon from "react-native-vector-icons/MaterialIcons";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientCategoryListScreen"> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const { categories, getCategories } = useViewModel();

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearchPress = () => {
    navigation.navigate("ClientProductSearchScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>a DE VERDURA</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Icon name="search" size={28} style={styles.searchIcon} />
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchInputPlaceholder}>Busque un producto</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.categoryListContainer}>
       <CategoryList categories={categories} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};
