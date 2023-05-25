import  { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductContext } from "../../../../context/ProductContext";

const AdminProductCreateViewModel = (category: Category) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { create } = useContext(ProductContext);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    id_category: category.id,
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const createProduct = async () => {
    console.log("Producto Formulario : " + JSON.stringify(values));
 
    setLoading(true);
    const response = await create(values, file!);
    setResponseMessage(response.message);
    setLoading(false);
    if (response.success) {
      resetForm();
    }
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


  const resetForm = async () => {
    setValues({
      name: "",
      description: "",
      image: "",
      price: "",
      id_category: category.id,
    });
  };

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    createProduct,
    loading,
    responseMessage,
  };
};

export default AdminProductCreateViewModel;
