import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { update } = new ProductRepositoryImp();

export const UpdateProductUseCase = async (product: Product) => {
  return await update(product);
};
