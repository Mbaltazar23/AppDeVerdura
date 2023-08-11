import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ResetPasswordAuthUseCase } from "../../../Domain/useCases/auth/ResetPasswordEmailAuth";

const ResetPasswordViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailRest, setEmailRest] = useState("");
  const [values, setValues] = useState({
    email: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const resetPassEmail = async () => {
    if (isValidEmail()) {
      const response = await ResetPasswordAuthUseCase(values.email);
      console.log("RESPONSE: " + JSON.stringify(response));
      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        await AsyncStorage.setItem("emailReset", values.email);
        console.log("Correo Guardado");
        // Guarda la respuesta en localStorage
        getEmailReset();
      }
    }
  };

  const isValidEmail = (): boolean => {
    if (values.email === "") {
      setErrorMessage("El Email es requerido para recuperar ");
      return false;
    }
    return true;
  };

  const getEmailReset = async () => {
    const emailReset = await AsyncStorage.getItem("emailReset");
    if (emailReset !== null) {
      setEmailRest(emailReset);
    }
  };

  return {
    ...values,
    onChange,
    resetPassEmail,
    errorMessage,
    emailRest,
  };
};

export default ResetPasswordViewModel;
