import React, { useState } from "react";
import { Product } from "../../../../../Domain/entities/Product";
import { GetProductsByCategoryUseCase } from "../../../../../Domain/useCases/product/GetProductsByCategory";
import { Category } from "../../../../../Domain/entities/Category";
import { GetAllCategoryUseCase } from "../../../../../Domain/useCases/category/GetAllCategory";

const ClientProductListViewModel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getProducts = async (id_category: string) => {
    const result = await GetProductsByCategoryUseCase(id_category);
    setProducts(result);
  };

  const getCategories = async () => {
    const result = await GetAllCategoryUseCase();
    setCategories(result);    
  };


  return {
    products,
    categories,
    getCategories,
    getProducts,
  };
};

export default ClientProductListViewModel;
