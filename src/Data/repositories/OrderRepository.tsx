import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import { ResponseStatusTransbank } from "../sources/remote/models/ResponseStatusTransbank";
import { ResponseApiTransbank } from "../sources/remote/models/ResponseApiTransbank";
import { OrderRepository } from "../../Domain/repositories/OrderRepository";
import { ApiDeVerdura } from "../sources/remote/api/ApiDeVerdura";
import { AxiosError } from "axios";
import { Transbank } from "../../Domain/entities/Transbank";
import { Payment } from "../../Domain/entities/Payment";
import { Order } from "../../Domain/entities/Order";

export class OrderRepositoryImpl implements OrderRepository {
  async getByStatus(status: string): Promise<Order[]> {
    try {
      const response = await ApiDeVerdura.get<Order[]>(
        `/orders/findByStatus/${status}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async getByIdOrder(order: Order): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.get<ResponseApiDeVerdura>(
        `/orders/findById/${order.id}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async getByClientAndStatus(
    idClient: string,
    status: string
  ): Promise<Order[]> {
    try {
      const response = await ApiDeVerdura.get<Order[]>(
        `/orders/findByClientAndStatus/${idClient}/${status}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async create(order: Order): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiDeVerdura>(
        "/orders/create",
        order
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async createPayment(payment: Payment): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiDeVerdura>(
        "/orders/payment/create",
        payment
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async createTransbankPayment(
    transbank: Transbank
  ): Promise<ResponseApiTransbank> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiTransbank>(
        "/orders/transbank/create",
        transbank
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiTransbank = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async returnResponseTransbankPayment(
    id_order: string,
    token: string
  ): Promise<ResponseStatusTransbank> {
    try {
      const response = await ApiDeVerdura.put<ResponseStatusTransbank>(
        "/orders/transbank/order-complete",
        {
          id_order: id_order,
          token: token,
        }
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseStatusTransbank = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async updateToDispatched(order: Order): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.put<ResponseApiDeVerdura>(
        "/orders/updateToDispatched",
        order
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async updateToDelivered(order: Order): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.put<ResponseApiDeVerdura>(
        "/orders/updateToDelivered",
        order
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
