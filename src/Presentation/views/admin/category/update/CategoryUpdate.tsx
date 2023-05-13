import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { RoundedButton } from "../../../../components/RoundedButton";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator";

interface Props
  extends StackScreenProps<CategoryStackParamList, "AdminCategoryUpdateScreen"> {}

export const AdminCategoryUpdateScreen = ({ navigation, route }: Props) => {
  const { category } = route.params;
  const {
    name,
    description,
    onChange,
    responseMessage,
    loading,
    takePhoto,
    pickImage,
    image,
    updateCategory,
  } = useViewModel(category);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
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

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Nombre de la categoria"
          keyboardType="default"
          image={require("../../../../../../assets/categories.png")}
          property="name"
          onChangeText={onChange}
          value={name}
        />
        <CustomTextInput
          placeholder="Descripcion de la Categoria"
          keyboardType="default"
          image={require("../../../../../../assets/description.png")}
          property="description"
          onChangeText={onChange}
          value={description}
        />
      </View>
      <View style={styles.buttonContainer}>
        <RoundedButton
          text="ACTUALIZAR CATEGORIA"
          onPress={() => updateCategory()}
        />
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
