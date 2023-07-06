import { Product } from "../../entities/Product";
import { FavoriteRepositoryImpl } from "../../../Data/repositories/FavoriteRepository";

const { remove } = new FavoriteRepositoryImpl();

export const DeleteFavoriteProductUseCase = async (product: Product) => {
  return await remove(product);
};
