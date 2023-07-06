import React, { useState, useEffect, useContext } from "react";
import { Order } from "../../../../../Domain/entities/Order";

interface DropDownProps {
  label: string;
  value: string;
}

const ClientOrderDetailViewModel = (order: Order) => {
  const [total, setTotal] = useState(0.0);
  const [responseMessage, setResponseMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);

  const getTotal = async () => {
    const calculatedTotal = order.products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity!,
      0
    );
    setTotal(calculatedTotal);
  };

  return {
    total,
    open,
    value,
    items,
    responseMessage,
    getTotal,
    setOpen,
    setValue,
    setItems,
  };
};

export default ClientOrderDetailViewModel;
