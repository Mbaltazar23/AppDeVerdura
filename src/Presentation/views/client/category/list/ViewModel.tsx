import { useState } from "react";
import { GetAllCategoryUseCase } from "../../../../../Domain/useCases/category/GetAllCategory";
import { Category } from "../../../../../Domain/entities/Category";

const ClientCategoryListViewModel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMessage, setShowMessage] = useState(false); // Agregamos el estado para mostrar/ocultar el mensaje

  const getCategories = async () => {
    const result = await GetAllCategoryUseCase();
    setCategories(result);
  };

  // Función para mostrar el mensaje cuando se agrega un producto al carrito
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Ocultar el mensaje después de 10 segundos
  };

  return {
    categories,
    getCategories,
    showMessage,
    setShowMessage,
    handleShowMessage,
  };
};

export default ClientCategoryListViewModel;
