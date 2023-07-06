import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import { FavoriteRepository } from "../../Domain/repositories/FavoriteRepository";
import { ApiDeVerdura } from "../sources/remote/api/ApiDeVerdura";
import { Favorite } from "../../Domain/entities/Favorite";
import { Product } from "../../Domain/entities/Product";
import { AxiosError } from "axios";
import { Category } from "../../Domain/entities/Category";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  async getFavoritesProductsByUser(id_user: string): Promise<Product[]> {
    try {
      const response = await ApiDeVerdura.get<Product[]>(
        `/favorite/findProductsFavoritesByUser/${id_user}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async getCategoriesByProductsFavorites(id_user: string): Promise<Category[]> {
    try {
      const response = await ApiDeVerdura.get<Category[]>(
        `/favorite/getCategoriesForProducts/${id_user}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async create(favorite: Favorite): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiDeVerdura>(
        "/favorite/create",
        favorite
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async remove(productFavorite: Product): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.delete<ResponseApiDeVerdura>(
        `/favorite/delete/${productFavorite.id}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
