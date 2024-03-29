import React, { useEffect, useState, useContext } from "react";
import { GetProductsFiltersUseCase } from "../../../../../Domain/useCases/product/GetProductsFilters";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";
import { Product } from "../../../../../Domain/entities/Product";

const ClientProductDetailViewModel = (product: Product) => {
  const productImagesList: string[] = [product.image];

  const { shoppingBag, saveItem } = useContext(ShoppingBagContext);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.0);
  const [productsFilters, setProductsFilters] = useState<Product[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const showConfirmationMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  useEffect(() => {
    const index = shoppingBag.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      setQuantity(shoppingBag[index].quantity!);
    } else {
      setQuantity(1); // Si el producto no existe en la bolsa de compras, establecemos la cantidad en 1 por defecto
    }
  }, [shoppingBag, product]);

  useEffect(() => {
    setPrice(product.price * quantity);
  }, [quantity, product]); // Actualizamos el precio cuando cambie la cantidad

  const addToBag = () => {
    if (quantity > 0) {
      product.quantity = quantity;
      saveItem(product);
      showConfirmationMessage(); // Mostrar el mensaje de confirmación
    }
    console.log("Bolsa de compras : " + JSON.stringify(shoppingBag));
  };

  const addItem = () => {
    setQuantity(quantity + 1);
  };

  const removeItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const getProductsFilterNotNames = async () => {
    const result = await GetProductsFiltersUseCase(
      product.id_category!,
      product.id!
    );
    setProductsFilters(result);
  };

  return {
    quantity,
    price,
    productImagesList,
    shoppingBag,
    productsFilters,
    getProductsFilterNotNames,
    addItem,
    addToBag,
    removeItem,
    showMessage,
    setShowMessage,
  };
};

export default ClientProductDetailViewModel;
