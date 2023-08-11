import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";
import { Payment } from "../../entities/Payment";

const { createPayment } = new OrderRepositoryImpl();

export const CreatePaymentUseCase = async (payment: Payment) => {
  return createPayment(payment);
};
