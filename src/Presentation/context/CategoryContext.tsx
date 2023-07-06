import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { createContext, useEffect, useState } from "react";
import { UpdateWithImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWithImageCategory";
import { GetAllCategoryUseCase } from "../../Domain/useCases/category/GetAllCategory";
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategory";
import { DeleteCategoryUseCase } from "../../Domain/useCases/category/DeleteCategory";
import { Category } from "../../Domain/entities/Category";
import * as ImagePicker from "expo-image-picker";

export interface CategoryContextProps {
  categories: Category[];
  getCategories(): Promise<void>;
  create(
    category: Category,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  update(category: Category): Promise<ResponseApiDeVerdura>;
  updateWithImage(
    category: Category,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  remove(id: string): Promise<ResponseApiDeVerdura>;
}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  const getCategories = async (): Promise<void> => {
    const result = await GetAllCategoryUseCase();
    setCategories(result);
  };

  const create = async (
    category: Category,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura> => {
    const response = await CreateCategoryUseCase(category, file!);
    getCategories();
    return response;
  };

  const update = async (category: Category): Promise<ResponseApiDeVerdura> => {
    const response = await UpdateCategoryUseCase(category);
    getCategories();
    return response;
  };

  const updateWithImage = async (
    category: Category,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura> => {
    const response = await UpdateWithImageCategoryUseCase(category, file!);
    getCategories();
    return response;
  };

  const remove = async (id: string): Promise<ResponseApiDeVerdura> => {
    const response = await DeleteCategoryUseCase(id);
    getCategories();
    return response;
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        create,
        update,
        updateWithImage,
        remove,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
