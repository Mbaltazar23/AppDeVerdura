import { AxiosError } from "axios";
import { Address } from "../../Domain/entities/Address";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import { ApiDeVerdura } from "../sources/remote/api/ApiDeVerdura";

export class AddressRepositoryImpl implements AddressRepository {
  
  async getByUser(idUser: string): Promise<Address[]> {
    try {
      const response = await ApiDeVerdura.get<Address[]>(
        `/address/findByUser/${idUser}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async create(address: Address): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiDeVerdura>(
        "/address/create",
        address
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
