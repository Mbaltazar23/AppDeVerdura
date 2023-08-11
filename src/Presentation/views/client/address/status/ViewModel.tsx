import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Order } from "../../../../../Domain/entities/Order";
import { Product } from "../../../../../Domain/entities/Product";

const ClientStatusOrderViewModel = (order:Order) => {
  const [ordersHolding, setOrdersHolding] = useState<Order[]>([]);


  const calculateProductTotal = (product: Product) => {
    return product.price * product.quantity!;
  };

  // Función para calcular el total general del pedido
  const calculateTotal = (products: Product[]) => {
    return products.reduce(
      (total, product) => total + calculateProductTotal(product),
      0
    );
  };

  return {
 
    calculateProductTotal,
    calculateTotal,
  };
};

export default ClientStatusOrderViewModel;
