import * as ImagePicker from "expo-image-picker";
import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Category } from "../entities/Category";

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  create(category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiDeVerdura>;
  update(category: Category): Promise<ResponseApiDeVerdura>;
  updateWithImage(category: Category,file: ImagePicker.ImageInfo): Promise<ResponseApiDeVerdura>;

  remove(id: string): Promise<ResponseApiDeVerdura>;
}
