import React, { createContext, useEffect, useState } from "react";
import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { GetByStatusByOrderUseCase } from "../../Domain/useCases/order/GetByStatusOrder";
import { UpdateToDispatchesOrderUseCase } from "../../Domain/useCases/order/UpdateToDispatchedOrder";
import { GetByClientAndStatusByOrderUseCase } from "../../Domain/useCases/order/GetByClientAndStatusOrder";
import { Order } from "../../Domain/entities/Order";
import { UpdateToDeliveredOrderUseCase } from "../../Domain/useCases/order/UpdateToDeliveredOrder";

export interface OrderContextProps {
  ordersPayed: Order[];
  ordersDispatched: Order[];
  ordersDelivery: Order[];
  getOrderByStatus(status: string): Promise<void>;
  getOrderByClientAndStatus(idClient: string, status: string): Promise<void>;
  updateToDispatched(order: Order): Promise<ResponseApiDeVerdura>;
  updateToDelivered(order: Order): Promise<ResponseApiDeVerdura>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
  const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
  const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
  const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

  useEffect(() => {
    setOrdersPayed([]);
    setOrdersDispatched([]);
    setOrdersDelivery([]);
  }, []);

  const getOrderByStatus = async (status: string) => {
    const result = await GetByStatusByOrderUseCase(status);
    if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDispatched(result);
    } else if (status === "ENTREGADO") {
      setOrdersDelivery(result);
    }
  };

  const getOrderByClientAndStatus = async (
    idClient: string,
    status: string
  ) => {
    const result = await GetByClientAndStatusByOrderUseCase(idClient, status);
    if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDispatched(result);
    } else if (status === "ENTREGADO") {
      setOrdersDelivery(result);
    }
  };

  const updateToDispatched = async (order: Order) => {
    const result = await UpdateToDispatchesOrderUseCase(order);
    getOrderByStatus("PAGADO");
    getOrderByStatus("DESPACHADO");
    return result;
  };

  const updateToDelivered = async (order: Order) => {
    const result = await UpdateToDeliveredOrderUseCase(order);
    getOrderByStatus("DESPACHADO");
    getOrderByStatus("PAGADO");
    return result;
  };

  return (
    <OrderContext.Provider
      value={{
        ordersPayed,
        ordersDispatched,
        ordersDelivery,
        getOrderByStatus,
        getOrderByClientAndStatus,
        updateToDelivered,
        updateToDispatched,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
