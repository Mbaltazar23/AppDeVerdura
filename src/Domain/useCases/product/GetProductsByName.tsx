import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";

const { getProductsFindByName } = new ProductRepositoryImp();

export const GetProductsByNameUseCase = async (name: string) => {
  return await getProductsFindByName(name);
};
