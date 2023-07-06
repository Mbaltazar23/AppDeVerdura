import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";

const { getProductsFilterNotName } = new ProductRepositoryImp();

export const GetProductsFiltersUseCase = async (
  id_category: string,
  id_product: string
) => {
  return await getProductsFilterNotName(id_category, id_product);
};
