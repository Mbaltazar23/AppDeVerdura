import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Transbank } from "../../entities/Transbank";

const { createTransbankPayment } = new OrderRepositoryImpl();

export const CreateTransbankPayUseCase = async (transbank: Transbank) => {
  return await createTransbankPayment(transbank);
};
