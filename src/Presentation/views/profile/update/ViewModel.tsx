import React, { useState, useContext } from "react";
import { UdpateUserUseCase } from "../../../../Domain/useCases/user/UpdateUser";
import { UdpateWithImageUserUseCase } from "../../../../Domain/useCases/user/UpdateWithImageUser";
import * as ImagePicker from "expo-image-picker";
import { useUserLocal } from "../../../hooks/useUserLocal";
import { User } from "../../../../Domain/entities/User";
import { ResponseApiDelivery } from "../../../../Data/sources/remote/models/ResponseApiDelivery";
import { UserConext } from "../../../context/UserContext";

const ProfileUpdateViewModel = (user: User) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [values, setValues] = useState(user);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { saveUserSesion } = useContext(UserConext);
  
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

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeInfoUpdate = (
    name: string,
    lastname: string,
    phone: string
  ) => {
    setValues({ ...values, name, lastname, phone });
  };

  const update = async () => {
    if (isValidForm()) {
      setLoading(true);
      let response = {} as ResponseApiDelivery;
      if (values.image?.includes("https://")) {
        response = await UdpateUserUseCase(values);
      } else {
        response = await UdpateWithImageUserUseCase(values, file!);
      }

      //const response = await RegisterAuthUseCase(values);
      setLoading(false);
      console.log("RESULT: " + JSON.stringify(response));

      if (response.success) {
        saveUserSesion(response.data);
        setSuccessMessage(response.message);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("Ingresa tu nombre");
      return false;
    }
    if (values.lastname === "") {
      setErrorMessage("Ingresa tu apellido");
      return false;
    }
    if (values.phone === "") {
      setErrorMessage("Ingresa tu telefono");
      return false;
    }

    return true;
  };

  return {
    ...values,
    onChange,
    update,
    pickImage,
    takePhoto,
    onChangeInfoUpdate,
    errorMessage,
    successMessage,
    loading,
    user,
  };
};

export default ProfileUpdateViewModel;
