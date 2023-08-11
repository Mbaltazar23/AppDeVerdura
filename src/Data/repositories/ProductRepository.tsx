import { Product } from "../../Domain/entities/Product";
import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { AxiosError } from "axios";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import {
  ApiDeVerdura,
  ApiDeVerduraWithImage,
} from "../sources/remote/api/ApiDeVerdura";

export class ProductRepositoryImp implements ProductRepository {
  
  async getProductsByCategory(id_category: string): Promise<Product[]> {
    try {
      const response = await ApiDeVerdura.get<Product[]>(
        `/products/findByCategory/${id_category}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve([]);
    }
  }

  async getProductsFindByName(name: string): Promise<Product[]> {
    try {
      const response = await ApiDeVerdura.get<Product[]>(
        `/products/findByName/${name}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve([]);
    }
  }

  async getProductsFilterNotName(
    id_category: string,
    id_product: string
  ): Promise<Product[]> {
    try {
      const response = await ApiDeVerdura.get<Product[]>(
        `/products/findProductFilterNotName/${id_category}/${id_product}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve([]);
    }
  }

  async create(
    product: Product,
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

      data.append("product", JSON.stringify(product));
      const response = await ApiDeVerduraWithImage.post<ResponseApiDeVerdura>(
        "/products/create",
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

  async update(product: Product): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.put<ResponseApiDeVerdura>(
        "/products/update",
        product
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

  async updateWithImages(
    product: Product,
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
      data.append("product", JSON.stringify(product));
      const response = await ApiDeVerduraWithImage.put<ResponseApiDeVerdura>(
        "/products/updateWithImages",
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

  async remove(product: Product): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.delete<ResponseApiDeVerdura>(
        `/products/delete/${product.id}`
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
