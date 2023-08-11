import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { returnResponseTransbankPayment } = new OrderRepositoryImpl();

export const ReturnTransbankStatusPayUseCase = async (
  id_order: string,
  token: string
) => {
  return await returnResponseTransbankPayment(id_order, token);
};
