import { useState, useContext, useEffect } from "react";
import { GetByClientAndStatusByOrderUseCase } from "../../../../../Domain/useCases/order/GetByClientAndStatusOrder";
import { GetByUserAddressUseCase } from "../../../../../Domain/useCases/address/GetByUserAddress";
import { CreateOrderUseCase } from "../../../../../Domain/useCases/order/CreateOrder";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";
import { UserContext } from "../../../../context/UserContext";
import { Address } from "../../../../../Domain/entities/Address";
import { Order } from "../../../../../Domain/entities/Order";


const ClientAddressListViewModel = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [checked, setChecked] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [order, setOrder] = useState<Order>(); // Estado local para almacenar el pedido actual
  // contextos usados e importados
  const { user, saveUserSesion } = useContext(UserContext);
  const { shoppingBag } = useContext(ShoppingBagContext);

  useEffect(() => {
    getAddress();
    if (user.address !== null && user.address !== undefined) {
      changeRadioValue(user.address!);
      console.log("USUARIO CON DIRECCION : " + JSON.stringify(user));
    }
  }, [user]);

  const createOrder = async () => {
    if (checked !== "") {
      // Verificar si se ha seleccionado una dirección
      const order: Order = {
        id_client: user.id!,
        id_address: user.address?.id!,
        lat: user.address?.lat,
        lng: user.address?.lng,
        products: shoppingBag,
      };
      const result = await CreateOrderUseCase(order);
      user.address = "";
      saveUserSesion(user);
      setChecked(""); // Reestablecer el input
      setLoading(true);
      //setResponseMessage(result.message);

      const orders = await GetByClientAndStatusByOrderUseCase(
        user.id!,
        "RECEPCIONADO"
      );
      const orderFind = orders.find((order) => order.id === result.data);
      setOrder(orderFind);
      setLoading(false);
    } else {
      setResponseMessage("Debe seleccionar una dirección para la Orden.");
    }
  };

  const changeRadioValue = (address: Address) => {
    setChecked(address.id!);
    user.address = address;
  };

  const getAddress = async () => {
    const result = await GetByUserAddressUseCase(user.id!);
    setAddress(result);
  };

  return {
    address,
    checked,
    responseMessage,
    getAddress,
    changeRadioValue,
    createOrder,
    order,
    loading,
  };
};

export default ClientAddressListViewModel;
