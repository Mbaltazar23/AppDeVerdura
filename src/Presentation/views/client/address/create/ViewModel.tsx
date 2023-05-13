import React, { useState, useContext, useEffect } from "react";
import { CreateAddressUseCase } from "../../../../../Domain/useCases/address/CreateAddress";
import { UserConext } from "../../../../context/UserContext";

const ClientAddressCreateViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, saveUserSesion, getUserSession } = useContext(UserConext);
  const [values, setValues] = useState({
    address: "",
    neighborhood: "",
    refPoint: "",
    lat: 0.0,
    lng: 0.0,
    id_user: "",
  });

  useEffect(() => {
    if (user.id != "") {
      onChange("id_user", user.id);
    }
  }, [user]);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
    setValues({ ...values, refPoint: refPoint, lat: lat, lng: lng });
  };
  const createAddress = async () => {
    console.log("Formulario : " + JSON.stringify(values));

    setLoading(true);
    const response = await CreateAddressUseCase(values);
    setResponseMessage(response.message);
    setLoading(false);
    if (response.success) {
      resetForm();
      user.address = values;
      user.address.id = response.data;
      await saveUserSesion(user);
      getUserSession();
    }
  };

  const resetForm = async () => {
    setValues({
      address: "",
      neighborhood: "",
      refPoint: "",
      lat: 0.0,
      lng: 0.0,
      id_user: user.id!,
    });
  };

  return {
    ...values,
    onChange,
    onChangeRefPoint,
    createAddress,
    loading,
    responseMessage,
  };
};

export default ClientAddressCreateViewModel;
