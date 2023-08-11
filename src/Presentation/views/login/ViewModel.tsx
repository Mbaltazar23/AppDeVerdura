import { useContext, useState } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";
import { UserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //const { user, getUserSession } = useUserLocal();
  const { user, saveUserSesion, getUserSession } = useContext(UserContext);
  console.log("Usuario en Sesion : " + JSON.stringify(user));

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password);
      console.log("response : " + JSON.stringify(response));
      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        saveUserSesion(response.data);
        getUserSession();
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Ingrese un correo electronico");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingrese un password");
      return false;
    }
    return true;
  };

  const removeEmailReset = async () => {
    const emailReset = await AsyncStorage.getItem("emailReset");
    console.log(emailReset);
    if (emailReset !== null || emailReset !== undefined) {
      await AsyncStorage.removeItem("emailReset");
      console.log("Correo quitado");
    }
  };

  return {
    user,
    errorMessage,
    ...values,
    login,
    onChange,
    removeEmailReset,
  };
};

export default LoginViewModel;
