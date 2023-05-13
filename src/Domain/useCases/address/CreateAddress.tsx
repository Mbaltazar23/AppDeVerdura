import React from "react";
import { Address } from "../../entities/Address";
import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository";
const { create } = new AddressRepositoryImpl();

export const CreateAddressUseCase = async (address: Address) => {
  return await create(address);
};
