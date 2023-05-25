import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import useViewModel from "./ViewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import styles from "./Styles";
import { CategoryList } from "./ItemsCategory";

interface Props
  extends StackScreenProps<ClientStackParamList, "ClientCategoryListScreen"> {}

export const ClientCategoryListScreen = ({ navigation, route }: Props) => {
  const { categories, getCategories } = useViewModel();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>a DE VERDURA</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={28} style={styles.searchIcon} />
        <TextInput placeholder="Busque un producto" style={styles.input} />
      </View>
      <View style={styles.categoryListContainer}>
       <CategoryList categories={categories} navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default ClientCategoryListScreen;
