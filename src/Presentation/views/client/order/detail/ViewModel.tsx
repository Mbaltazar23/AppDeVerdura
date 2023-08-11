import { useState, useContext } from "react";
import { ResponseApiDeVerdura } from "../../../../../Data/sources/remote/models/ResponseApiDeVerdura";
import { ResponseApiTransbank } from "../../../../../Data/sources/remote/models/ResponseApiTransbank";
import { OrderContext } from "../../../../context/OrderContext";
import { Order } from "../../../../../Domain/entities/Order";

interface DropDownProps {
  label: string;
  value: string;
}

const ClientOrderDetailViewModel = (order: Order) => {
  const { createPayment, createTransbankPayment, getOrderById } = useContext(OrderContext);
  const [total, setTotal] = useState(0.0);
  const [responseMessage, setResponseMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false); // Agregamos el estado para mostrar/ocultar el mensaje
  const [transbankToken, setTransbankToken] = useState("");
  const [transbankUrl, setTransbankURL] = useState("");
  const [orderGet, setOrderGet] = useState(order)
  const [transbankModalVisible, setTransbankModalVisible] = useState(false);
  const [values, setValues] = useState({
    id_order: order.id!,
    method: "",
  });
  
  const [paymentMethods, setPaymentMethods] = useState<DropDownProps[]>([
    { label: "Seleccione un metodo de pago", value: "" },
    { label: "Transferencia", value: "Transferencia" },
    { label: "Efectivo", value: "Efectivo" },
    { label: "Transbank", value: "Transbank" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

   // Función para mostrar el mensaje cuando se agrega un producto al carrito
   const handleShowMessage = async () => {
    setShowMessage(true);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Mostrar el mensaje durante 3 segundos
    setShowMessage(false);
  };

  // Agregamos un estado para controlar si el botón de pago debe estar habilitado o no
  //const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(true);

  // Función para manejar el cambio en la selección del método de pago
  const handleMethodSelection = (selectedMethod: string) => {
    if (!selectedMethod) {
      setResponseMessage("Debe selecccionar un medio de Pago para pagar !!");
    } else {
      // Validamos que el valor seleccionado no esté vacío
      //setPaymentButtonDisabled(!selectedMethod);
      // Actualizamos el valor en el ViewModel
      setValues({ ...values, method: selectedMethod });
    }
  };

  const getTotal = async () => {
    const calculatedTotal = order.products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity!,
      0
    );
    setTotal(calculatedTotal);
  };

  const handlePayment = async () => {
    let result = {} as ResponseApiDeVerdura;
  
    if (!values.method) {
      // Si no se selecciona un método, establecemos el mensaje de error
      setResponseMessage("Debe seleccionar un método de pago");
      return;
    }
    // Llama al useCase para crear el payment y obtén la respuesta
    result = await createPayment(values);
    // Actualiza el mensaje de respuesta con el resultado del Use Case
    setResponseMessage(result.message);
    if (result.success) {
      const resultOrder = await getOrderById(order);
      const getOrder: Order = resultOrder.data;
      setOrderGet(getOrder); // Actualiza el estado del pedido
      // Retornamos un valor booleano para indicar que el pago se realizó correctamente
      return result;
    }
    // Retornamos un valor booleano para indicar que el pago no se realizó correctamente
    return result;
  };
  const validateTransbank = async () => {
    let transbankData = {} as ResponseApiTransbank;
    if (order.payment?.method === "Transbank") {
      await getTotal();
      console.log("TOTAL : ", JSON.stringify(total, null, 3));

      // Llama al Use Case para obtener el token y la URL de Transbank
      transbankData = await createTransbankPayment({
        id_order: values.id_order,
        total: total.toString(),
      });
      // Retorna la respuesta
      if (transbankData.success) {
        setTransbankURL(transbankData.data?.url);
        setTransbankToken(transbankData.data?.token);
        //console.log("RESPONSE : ", JSON.stringify(transbankData, null, 3));
        return transbankData;
      }
    } else {
      //setResponseMessage("Error al realizar el pago.");
      console.error("Error al realizar el pago..");
    }
  };

  const openTransbankURL = async () => {
    const result = await validateTransbank();
    if (result?.success) {
      console.log("DATA VALIDATE TRANSBANK : ",JSON.stringify(result, null,3));
      setTransbankModalVisible(true);
    } else {
      console.error("Error al obtener la URL desde el backend");
    }
  };

  return {
    total,
    handlePayment,
    values,
    paymentMethods,
    responseMessage,
    getTotal,
    setPaymentMethods,
    handleMethodSelection,
    //isPaymentButtonDisabled,
    modalVisible,
    handleCloseModal,
    handleOpenModal,
    openTransbankURL,
    validateTransbank,
    transbankUrl,
    transbankToken,
    transbankModalVisible,
    setTransbankModalVisible,
    getOrderById,
    handleShowMessage,
    showMessage,
    setShowMessage,
    orderGet
  };
};

export default ClientOrderDetailViewModel;
