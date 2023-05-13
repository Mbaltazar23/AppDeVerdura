import { AxiosError } from "axios";
import { Order } from "../../Domain/entities/Order";
import { OrderRepository } from "../../Domain/repositories/OrderRepository";
import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import { ApiDeVerdura } from "../sources/remote/api/ApiDeVerdura";

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

  async getByDeliveryAndStatus(
    idDelivery: string,
    status: string
  ): Promise<Order[]> {
    try {
      const response = await ApiDeVerdura.get<Order[]>(
        `/orders/findByDeliveryAndStatus/${idDelivery}/${status}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
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

  async updateToOnTheWay(order: Order): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.put<ResponseApiDeVerdura>(
        "/orders/updateToOnTheWay",
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
