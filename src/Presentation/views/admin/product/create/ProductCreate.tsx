import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { RoundedButton } from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import { StackScreenProps } from "@react-navigation/stack";
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator";
import { ModalPickImage } from "../../../../components/ModalPickImage";

interface Props
  extends StackScreenProps<ProductStackParamList, "AdminProductCreateScreen"> {}

export const AdminProductCreateScreen = ({ navigation, route }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { category } = route.params;
  const {
    name,
    description,
    price,
    onChange,
    responseMessage,
    loading,
    takePhoto,
    pickImage,
    image,
    createProduct,
  } = useViewModel(category);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  const handleCreateProduct = async () => {
    const isSuccess = await createProduct();
    if (isSuccess) {
      navigation.navigate("AdminProductListScreen", { category: category });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setModalVisible(true)}
        >
          {image == "" ? (
            <Image
              source={require("../../../../../../assets/image_new.png")}
              style={styles.image}
            />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <View style={styles.categoryInfo}>
            <Image
              style={styles.imageCategory}
              source={require("../../../../../../assets/menu.png")}
            />
            <Text style={styles.textCategory}>Categoria Seleccionada </Text>
            <Text>{category.name}</Text>
          </View>

          <CustomTextInput
            placeholder="Nombre del producto"
            keyboardType="default"
            image={require("../../../../../../assets/categories.png")}
            property="name"
            onChangeText={onChange}
            value={name}
          />
          <CustomTextInput
            placeholder="Descripcion"
            keyboardType="default"
            image={require("../../../../../../assets/description.png")}
            property="description"
            onChangeText={onChange}
            value={description}
          />
          <CustomTextInput
            placeholder="Precio"
            keyboardType="numeric"
            image={require("../../../../../../assets/price.png")}
            property="price"
            onChangeText={onChange}
            value={`${price}`}
          />
          <View style={styles.buttonContainer}>
            <RoundedButton
              text="CREAR PRODUCTO"
              onPress={() => handleCreateProduct()}
            />
          </View>
        </ScrollView>
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {loading && (
        <ActivityIndicator
          style={MyStyles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
};
