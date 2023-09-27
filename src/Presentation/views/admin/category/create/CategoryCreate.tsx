import React, { useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { MyColors, MyStyles } from "../../../../theme/AppTheme";
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { RoundedButton } from "../../../../components/RoundedButton";
import useViewModel from "./ViewModel";
import styles from "./Styles";

interface Props
  extends StackScreenProps<
    CategoryStackParamList,
    "AdminCategoryCreateScreen"
  > {}

export const AdminCategoryCreateScreen = ({ navigation, route }: Props) => {
  const {
    name,
    description,
    onChange,
    responseMessage,
    loading,
    takePhoto,
    pickImage,
    image,
    createCategory,
    modalVisible,
    setModalVisible,
  } = useViewModel();

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    //navigation.navigate("AdminCategoryListScreen");
    }
  }, [responseMessage]);

  const handleCreateCategory = async () => {
    const isSuccess = await createCategory();
    if (isSuccess) {
      navigation.navigate("AdminCategoryListScreen");
    }
  };
  
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
          text="CREAR CATEGORIA"
          onPress={() => handleCreateCategory()}
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
