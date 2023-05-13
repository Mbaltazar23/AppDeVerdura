import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getByStatus } = new OrderRepositoryImpl();

export const GetByStatusByOrderUseCase = async (status:string) => {
  return await getByStatus(status);
};
