import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Product } from "../entities/Product";
import * as ImagePicker from "expo-image-picker";

export interface ProductRepository {
  create(
    product: Product,
    files: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  getProductsByCategory(id_category: string): Promise<Product[]>;
  getProductsFindByName(name: string): Promise<Product[]>;
  getProductsFilterNotName(id_category: string, id_product: string): Promise<Product[]>;
  update(product: Product): Promise<ResponseApiDeVerdura>;
  updateWithImages(
    product: Product,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  remove(product: Product): Promise<ResponseApiDeVerdura>;
}
