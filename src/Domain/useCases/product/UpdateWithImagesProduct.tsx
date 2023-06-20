import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from "expo-image-picker";

const { updateWithImages } = new ProductRepositoryImp();

export const UpdateWithImagesProductUseCase = async (
  product: Product,
  file: ImagePicker.ImageInfo
) => {
  return await updateWithImages(product, file);
};
