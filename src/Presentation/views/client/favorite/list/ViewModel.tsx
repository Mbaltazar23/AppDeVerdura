import { useContext, useState } from "react";
import { GetFavoriteProductsUseCase } from "../../../../../Domain/useCases/favorite/GetFavoriteProducts";
import { Product } from "../../../../../Domain/entities/Product";
import { UserContext } from "../../../../context/UserContext";

const ClientFavoriteProductsViewModel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useContext(UserContext);

  const getProductsFavorites = async () => {
    const result = await GetFavoriteProductsUseCase(user.id!);
    setProducts(result);
    //console.log("Products Favorites: " + JSON.stringify(result, null, 3));
  };

  return {
    products,
    getProductsFavorites,
  };
};
export default ClientFavoriteProductsViewModel;
