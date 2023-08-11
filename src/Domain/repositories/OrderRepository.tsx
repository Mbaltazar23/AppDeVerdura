import { ResponseStatusTransbank } from "../../Data/sources/remote/models/ResponseStatusTransbank";
import { ResponseApiTransbank } from "../../Data/sources/remote/models/ResponseApiTransbank";
import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Transbank } from "../entities/Transbank";
import { Payment } from "../entities/Payment";
import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: Order): Promise<ResponseApiDeVerdura>;
  createPayment(payment: Payment): Promise<ResponseApiDeVerdura>;
  createTransbankPayment(transbank: Transbank): Promise<ResponseApiTransbank>;
  returnResponseTransbankPayment(
    id_order: string,
    token: string
  ): Promise<ResponseStatusTransbank>;
  getByStatus(status: string): Promise<Order[]>;
  getByIdOrder(order: Order): Promise<ResponseApiDeVerdura>;
  getByClientAndStatus(idClient: string, status: string): Promise<Order[]>;
  updateToDispatched(order: Order): Promise<ResponseApiDeVerdura>;
  updateToDelivered(order: Order): Promise<ResponseApiDeVerdura>;
}
