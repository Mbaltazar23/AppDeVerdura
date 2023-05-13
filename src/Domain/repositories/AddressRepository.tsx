import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Address } from "../entities/Address";

export interface AddressRepository {
  getByUser(idUser: string): Promise<Address[]>;
  create(address: Address): Promise<ResponseApiDeVerdura>;
}
