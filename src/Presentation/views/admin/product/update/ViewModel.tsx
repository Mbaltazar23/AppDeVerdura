import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";
import { ResponseApiDeVerdura } from "../../../../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Category } from "../../../../../Domain/entities/Category";

const AdminProductUpdateViewModel = (product: Product, category: Category) => {
  console.log("Producto: " + JSON.stringify(product));

  const [values, setValues] = useState(product);

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();

  const { update, updateWithImages } = useContext(ProductContext);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const updateProduct = async () => {
    console.log("Producto Formulario : " + JSON.stringify(values));
    let response = {} as ResponseApiDeVerdura;
    if (values.image?.includes("https://")) {
      // ACTUALIZAR SIN IMAGEN
      response = await update(values);
    } else {
      response = await updateWithImages(values, file!);
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
    updateProduct,
    loading,
    responseMessage,
  };
};

export default AdminProductUpdateViewModel;
