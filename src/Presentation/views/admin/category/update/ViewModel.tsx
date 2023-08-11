import React, { useState, useContext } from "react";
import { ResponseApiDeVerdura } from "../../../../../Data/sources/remote/models/ResponseApiDeVerdura";
import { CategoryContext } from "../../../../context/CategoryContext";
import { Category } from "../../../../../Domain/entities/Category";
import * as ImagePicker from "expo-image-picker";

const AdminCategoryUpdateViewModel = (category: Category) => {
  const [values, setValues] = useState(category);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { update, updateWithImage } = useContext(CategoryContext);
  

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const updateCategory = async () => {
    setLoading(true);
    let response = {} as ResponseApiDeVerdura;
    if (values.image?.includes("https://")) {
      // ACTUALIZAR SIN IMAGEN
      response = await update(values);
    } else {
      response = await updateWithImage(values, file!);
    }
    setResponseMessage(response.message);
    setLoading(false);
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

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    updateCategory,
    loading,
    responseMessage,
  };
};

export default AdminCategoryUpdateViewModel;
