import { AxiosError } from "axios";
import { Category } from "../../Domain/entities/Category";
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
import {
  ApiDeVerdura,
  ApiDeVerduraWithImage,
} from "../sources/remote/api/ApiDeVerdura";
import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

export class CategoryRepositoryImpl implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    try {
      const response = await ApiDeVerdura.get<Category[]>("/categories/getAll");
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async create(
    category: Category,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura> {
    try {
      let data = new FormData();
      data.append("image", {
        uri: file.uri,
        // @ts-ignore
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri)!,
      });
      data.append("category", JSON.stringify(category));
      const response = await ApiDeVerduraWithImage.post<ResponseApiDeVerdura>(
        "/categories/create",
        data
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

  async update(category: Category): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.put<ResponseApiDeVerdura>(
        "/categories/update",
        category
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

  async updateWithImage(
    category: Category,
    file: ImagePicker.ImagePickerAsset
  ): Promise<ResponseApiDeVerdura> {
    try {
      let data = new FormData();
      data.append("image", {
        uri: file.uri,
        // @ts-ignore
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri)!,
      });
      data.append("category", JSON.stringify(category));
      const response = await ApiDeVerduraWithImage.put<ResponseApiDeVerdura>(
        "/categories/updateWithImage",
        data
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

  async remove(id: string): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.delete<ResponseApiDeVerdura>(
        `/categories/delete/${id}`
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
