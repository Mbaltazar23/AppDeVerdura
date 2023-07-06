import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Category } from "../entities/Category";
import { Favorite } from "../entities/Favorite";
import { Product } from "../entities/Product";

export interface FavoriteRepository {
  create(favorite: Favorite): Promise<ResponseApiDeVerdura>;
  getFavoritesProductsByUser(id_user: string): Promise<Product[]>;
  getCategoriesByProductsFavorites(id_user: string): Promise<Category[]>;
  remove(productFavorite: Product): Promise<ResponseApiDeVerdura>;
}
