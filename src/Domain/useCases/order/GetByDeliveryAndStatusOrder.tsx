import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getByDeliveryAndStatus } = new OrderRepositoryImpl();

export const GetByDeliveryAndStatusByOrderUseCase = async (
  idDelivery: string,
  status: string
) => {
  return await getByDeliveryAndStatus(idDelivery, status);
};
