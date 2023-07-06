import { FavoriteRepositoryImpl } from "../../../Data/repositories/FavoriteRepository";
const { getCategoriesByProductsFavorites } = new FavoriteRepositoryImpl();

export const GetCategoriesByProductsFavoritesUseCase = async (
  id_user: string
) => {
  return await getCategoriesByProductsFavorites(id_user);
};
