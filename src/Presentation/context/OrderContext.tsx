import { createContext, useEffect, useState } from "react";
import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Order } from "../../Domain/entities/Order";
import { GetByStatusByOrderUseCase } from "../../Domain/useCases/order/GetByStatusOrder";
import { UpdateToDispatchesOrderUseCase } from "../../Domain/useCases/order/UpdateToDispatchedOrder";
import { GetByDeliveryAndStatusByOrderUseCase } from "../../Domain/useCases/order/GetByDeliveryAndStatusOrder";
import { UpdateToOnTheWayOrderUseCase } from "../../Domain/useCases/order/UpdateToOnTheWayOrder";
import { UpdateToDeliveredOrderUseCase } from "../../Domain/useCases/order/UpdateToDeliveredOrder";
import { GetByClientAndStatusByOrderUseCase } from "../../Domain/useCases/order/GetByClientAndStatusOrder";

export interface OrderContextProps {
  ordersPayed: Order[];
  ordersDispatched: Order[];
  ordersOnTheWay: Order[];
  ordersDelivery: Order[];
  getOrderByStatus(status: string): Promise<void>;
  getOrderByDeliveryAndStatus(
    idDelivery: string,
    status: string
  ): Promise<void>;
  getOrderByClientAndStatus(
    idClient: string,
    status: string
  ): Promise<void>;

  updateToDispatched(order: Order): Promise<ResponseApiDeVerdura>;
  updateToOnTheWay(order: Order): Promise<ResponseApiDeVerdura>;
  updateToDelivered(order: Order): Promise<ResponseApiDeVerdura>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
  const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
  const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
  const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
  const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

  useEffect(() => {
    setOrdersPayed([]);
    setOrdersDispatched([]);
    setOrdersOnTheWay([]);
    setOrdersDelivery([]);
  }, []);

  const getOrderByStatus = async (status: string) => {
    const result = await GetByStatusByOrderUseCase(status);
    if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDispatched(result);
    } else if (status === "EN CAMINO") {
      setOrdersOnTheWay(result);
    } else if (status === "ENTREGADO") {
      setOrdersDelivery(result);
    }
  };

  const getOrderByDeliveryAndStatus = async (
    idDelivery: string,
    status: string
  ) => {
    const result = await GetByDeliveryAndStatusByOrderUseCase(
      idDelivery,
      status
    );
    if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDispatched(result);
    } else if (status === "EN CAMINO") {
      setOrdersOnTheWay(result);
    } else if (status === "ENTREGADO") {
      setOrdersDelivery(result);
    }
  };

  const getOrderByClientAndStatus = async (
    idClient: string,
    status: string
  ) => {
    const result = await GetByClientAndStatusByOrderUseCase(
      idClient,
      status
    );
    if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDispatched(result);
    } else if (status === "EN CAMINO") {
      setOrdersOnTheWay(result);
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

  const updateToOnTheWay = async (order: Order) => {
    const result = await UpdateToOnTheWayOrderUseCase(order);
    getOrderByDeliveryAndStatus(order.delivery?.id!, "DESPACHADO");

    getOrderByDeliveryAndStatus(order.delivery?.id!, "EN CAMINO");
    return result;
  };

  const updateToDelivered = async (order: Order) => {
    const result = await UpdateToDeliveredOrderUseCase(order);
    getOrderByDeliveryAndStatus(order.delivery?.id!, "EN CAMINO");

    getOrderByDeliveryAndStatus(order.delivery?.id!, "ENTREGADO");
    return result;
  };

  return (
    <OrderContext.Provider
      value={{
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        getOrderByStatus,
        getOrderByDeliveryAndStatus,
        getOrderByClientAndStatus,
        updateToDispatched,
        updateToOnTheWay,
        updateToDelivered,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
