import React, { useState, useEffect, useContext } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { GetDeliveryMenUserUseCase } from "../../../../../Domain/useCases/user/GetDeliveryMenUser";
import { User } from "../../../../../Domain/entities/User";
import { OrderContext } from "../../../../context/OrderContext";

interface DropDownProps {
  label: string;
  value: string;
}

const AdminOrderDetailViewModel = (order: Order) => {
  const [total, setTotal] = useState(0.0);
  const [deliveryMen, setDeliveryMen] = useState<User[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);
  const { updateToDispatched } = useContext(OrderContext);

  useEffect(() => {
    setDroppDownItems();
  }, [deliveryMen]);

  const setDroppDownItems = async () => {
    let itemDeliveryMen: DropDownProps[] = [];
    deliveryMen.forEach((delivery) => {
      itemDeliveryMen.push({
        label: delivery.name + " " + delivery.lastname,
        value: delivery.id!,
      });
    });
    setItems(itemDeliveryMen);
  };

  const dispatchOrder = async () => {
    if (value !== null) {
      order.id_delivery = value!;
      const result = await updateToDispatched(order);
      setResponseMessage(result.message);
    } else {
      setResponseMessage("Seleccione a un repartidor..");
    }
    console.log("REPARTIDOR SELECCIONADO: " + value);
  };

  const getDeliveryMen = async () => {
    const result = await GetDeliveryMenUserUseCase();
    console.log("Repartidores:  " + JSON.stringify(result, null, 3));

    setDeliveryMen(result);
  };

  const getTotal = async () => {
    order.products.forEach((p) => {
      setTotal(total + p.price * p.quantity!);
    });
  };

  return {
    total,
    deliveryMen,
    open,
    value,
    items,
    responseMessage,
    getTotal,
    getDeliveryMen,
    setOpen,
    setValue,
    setItems,
    dispatchOrder,
  };
};

export default AdminOrderDetailViewModel;
