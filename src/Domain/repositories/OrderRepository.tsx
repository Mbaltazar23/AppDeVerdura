import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: Order): Promise<ResponseApiDeVerdura>;
  updateToDispatched(order: Order): Promise<ResponseApiDeVerdura>;
  updateToOnTheWay(order: Order): Promise<ResponseApiDeVerdura>;
  updateToDelivered(order: Order): Promise<ResponseApiDeVerdura>;
  getByStatus(status: string): Promise<Order[]>;
  getByDeliveryAndStatus(idDelivery: string, status: string): Promise<Order[]>;
  getByClientAndStatus(idClient: string, status: string): Promise<Order[]>;
}
