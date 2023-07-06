import { FavoriteRepositoryImpl } from "../../../Data/repositories/FavoriteRepository";
import { Favorite } from "../../entities/Favorite";

const { create } = new FavoriteRepositoryImpl();

export const CreateFavoriteUseCase = async (favorite: Favorite) => {
  return await create(favorite);
};
