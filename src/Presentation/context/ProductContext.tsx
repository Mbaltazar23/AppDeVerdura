import React, { useState } from "react";
import { createContext } from "react";
import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { Product } from "../../Domain/entities/Product";
import * as ImagePicker from "expo-image-picker";
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct";
import { GetProductsByCategoryUseCase } from "../../Domain/useCases/product/GetProductsByCategory";
import { DeleteProductUseCase } from "../../Domain/useCases/product/DeleteProduct";
import { UpdateProductUseCase } from "../../Domain/useCases/product/UpdateProduct";
import { UpdateWithImagesProductUseCase } from "../../Domain/useCases/product/UpdateWithImagesProduct";

export interface ProductContextProps {
  products: Product[];
  getProducts(id_category: string): Promise<void>;
  create(
    product: Product,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  updateWithImages(
    product: Product,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  update(product: Product): Promise<ResponseApiDeVerdura>;
  remove(product: Product): Promise<ResponseApiDeVerdura>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async (id_category: string): Promise<void> => {
    const result = await GetProductsByCategoryUseCase(id_category);
    setProducts(result);
  };

  const create = async (
    product: Product,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura> => {
    const response = await CreateProductUseCase(product, file);
    getProducts(product.id_category!);
    return response;
  };

  const update = async (product: Product): Promise<ResponseApiDeVerdura> => {
    const response = await UpdateProductUseCase(product);
    getProducts(product.id_category!);
    return response;
  };

  const updateWithImages = async (
    product: Product,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura> => {
    const response = await UpdateWithImagesProductUseCase(product, file);
    getProducts(product.id_category!);
    return response;
  };

  const remove = async (product: Product): Promise<ResponseApiDeVerdura> => {
    const response = await DeleteProductUseCase(product);
    getProducts(product.id_category!);
    return response;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        create,
        updateWithImages,
        update,
        remove,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
