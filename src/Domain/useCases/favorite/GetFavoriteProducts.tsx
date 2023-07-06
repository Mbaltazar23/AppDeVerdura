import { FavoriteRepositoryImpl } from "../../../Data/repositories/FavoriteRepository";

const { getFavoritesProductsByUser } = new FavoriteRepositoryImpl();

export const GetFavoriteProductsUseCase = async (id_user: string) => {
  return await getFavoritesProductsByUser(id_user);
};
