import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Order } from "../../entities/Order";

const { getByIdOrder } = new OrderRepositoryImpl();

export const GetByIdOrderUseCase = async (order: Order) => {
  return await getByIdOrder(order);
};
