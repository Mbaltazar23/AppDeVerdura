import React from "react";
import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { remove } = new ProductRepositoryImp();
export const DeleteProductUseCase = async (product: Product) => {
  return await remove(product);
};
