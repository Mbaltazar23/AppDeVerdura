import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryCreateViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { create } = useContext(CategoryContext);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const createCategory = async () => {
    if (isValidForm()) {
      setLoading(true);
      const response = await create(values, file!);
      setResponseMessage(response.message);
      setLoading(false);
      if (response.success) {
        resetForm();
        return true; // Indica que la creación fue exitosa
      }
    }
    return false; // Indica que la creación no fue exitosa
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setResponseMessage("Ingrese un nombre para la Categoria !!");
      return false;
    }
    if (values.image === "") {
      setResponseMessage("Ingrese una imagen para la Categoria !!");
      return false;
    }
    return true;
  };

  const resetForm = async () => {
    setValues({
      name: "",
      description: "",
      image: "",
    });
  };

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    createCategory,
    loading,
    responseMessage,
    modalVisible,
    setModalVisible,
  };
};

export default AdminCategoryCreateViewModel;
