import React, { useState } from "react";
import { GetProductsByNameUseCase } from "../../../../../Domain/useCases/product/GetProductsByName";
import { Product } from "../../../../../Domain/entities/Product";

const FavoriteProduchSearchViewModel = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (text: string) => {
    try {
      if (text.trim() === "") {
        setProductList([]);
      } else {
        const filteredProducts = await GetProductsByNameUseCase(text);
        setProductList(filteredProducts);
      }
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      setProductList([]);
    }
  };

  return {
    productList,
    handleSearch,
    searchText,
    setSearchText,
  };
};

export default FavoriteProduchSearchViewModel;
