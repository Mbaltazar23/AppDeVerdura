import React, { createContext, useEffect, useState } from "react";
import { GetByClientAndStatusByOrderUseCase } from "../../Domain/useCases/order/GetByClientAndStatusOrder";
import { ReturnTransbankStatusPayUseCase } from "../../Domain/useCases/order/ReturnTransbankStatusPay";
import { UpdateToDispatchesOrderUseCase } from "../../Domain/useCases/order/UpdateToDispatchedOrder";
//import { UpdateToDeliveredOrderUseCase } from "../../Domain/useCases/order/UpdateToDeliveredOrder";
import { CreateTransbankPayUseCase } from "../../Domain/useCases/order/CreateTransbankPay";
import { GetByStatusByOrderUseCase } from "../../Domain/useCases/order/GetByStatusOrder";
import { ResponseStatusTransbank } from "../../Data/sources/remote/models/ResponseStatusTransbank";
import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { CreatePaymentUseCase } from "../../Domain/useCases/order/CreatePayment";
import { ResponseApiTransbank } from "../../Data/sources/remote/models/ResponseApiTransbank";
import { GetByIdOrderUseCase } from "../../Domain/useCases/order/GetByIdOrder";
import { Order } from "../../Domain/entities/Order";
import { Payment } from "../../Domain/entities/Payment";
import { Transbank } from "../../Domain/entities/Transbank";

export interface OrderContextProps {
  ordersHolding: Order[];
  ordersPayed: Order[];
  ordersDelivery: Order[];
  createPayment(payment: Payment): Promise<ResponseApiDeVerdura>;
  createTransbankPayment(transbank: Transbank): Promise<ResponseApiTransbank>;
  returnResponseTransbankPayment(
    id_order: string,
    token: string
  ): Promise<ResponseStatusTransbank>;
  getOrderByStatus(status: string): Promise<void>;
  getOrderById(order: Order): Promise<ResponseApiDeVerdura>;
  getOrderByClientAndStatus(idClient: string, status: string): Promise<void>;
  updateToDispatched(order: Order): Promise<ResponseApiDeVerdura>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
  const [ordersHolding, setOrdersHolding] = useState<Order[]>([]);
  const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
  const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

  useEffect(() => {
    setOrdersHolding([]);
    setOrdersPayed([]);
    setOrdersDelivery([]);
  }, []);

  const getOrderByStatus = async (status: string) => {
    const result = await GetByStatusByOrderUseCase(status);
    if (status === "RECEPCIONADO") {
      setOrdersHolding(result);
    } else if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDelivery(result);
    }
  };

  const getOrderById = async (order: Order) => {
    const result = await GetByIdOrderUseCase(order);
    return result;
  };

  const getOrderByClientAndStatus = async (
    idClient: string,
    status: string
  ) => {
    const result = await GetByClientAndStatusByOrderUseCase(idClient, status);
    if (status === "RECEPCIONADO") {
      setOrdersHolding(result);
    } else if (status === "PAGADO") {
      setOrdersPayed(result);
    } else if (status === "DESPACHADO") {
      setOrdersDelivery(result);
    }
  };

  const createPayment = async (payment: Payment) => {
    const result = await CreatePaymentUseCase(payment);
    getOrderByStatus("PAGADO");
    getOrderByStatus("DESPACHADO");
    return result;
  };

  const createTransbankPayment = async (transbank: Transbank) => {
    const result = await CreateTransbankPayUseCase(transbank);
    getOrderByStatus("PAGADO");
    getOrderByStatus("DESPACHADO");
    return result;
  };

  const returnResponseTransbankPayment = async (
    id_order: string,
    token: string
  ) => {
    const result = await ReturnTransbankStatusPayUseCase(id_order, token);
    getOrderByStatus("DESPACHADO");
    getOrderByStatus("PAGADO");
    return result;
  };

  const updateToDispatched = async (order: Order) => {
    const result = await UpdateToDispatchesOrderUseCase(order);
    getOrderByStatus("PAGADO");
    getOrderByStatus("DESPACHADO");
    return result;
  };

  return (
    <OrderContext.Provider
      value={{
        ordersHolding,
        ordersPayed,
        ordersDelivery,
        createPayment,
        createTransbankPayment,
        returnResponseTransbankPayment,
        getOrderByStatus,
        getOrderById,
        getOrderByClientAndStatus,
        updateToDispatched,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
