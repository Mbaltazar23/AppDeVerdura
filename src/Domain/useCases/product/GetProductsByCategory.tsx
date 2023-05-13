import React from "react";
import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";
const { getProductsByCategory } = new ProductRepositoryImp();
export const GetProductsByCategoryUseCase = async (id_category: string) => {
  return await getProductsByCategory(id_category);
};
