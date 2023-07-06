import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: Order): Promise<ResponseApiDeVerdura>;
  getByStatus(status: string): Promise<Order[]>;
  getByClientAndStatus(idClient: string, status: string): Promise<Order[]>;
  updateToDispatched(order: Order): Promise<ResponseApiDeVerdura>;
  updateToDelivered(order: Order): Promise<ResponseApiDeVerdura>;
}
