import { useState, useContext } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { Order } from "../../../../../Domain/entities/Order";

const AdminOrderDetailViewModel = (order: Order) => {
  const [total, setTotal] = useState(0.0);
  const [responseMessage, setResponseMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { updateToDispatched } = useContext(OrderContext);

  const dispatchOrder = async () => {
    const result = await updateToDispatched(order);
    setResponseMessage(result.message);
    //console.log("REPARTIDOR SELECCIONADO: " + value);
  };


  const handleConfirmAction = () => {
    if (order.status === "PAGADO") {
      dispatchOrder();
    } 
  };

  const getTotal = async () => {
    const calculatedTotal = order.products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity!,
      0
    );
    setTotal(calculatedTotal);
  };

  return {
    total,
    responseMessage,
    getTotal,
    setModalVisible,
    modalVisible,
    handleConfirmAction,
  };
};

export default AdminOrderDetailViewModel;
