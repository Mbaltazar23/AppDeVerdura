import React, { useEffect, useState, useContext } from "react";
import { Product } from "../../../../../Domain/entities/Product";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";

const ClientProductDetailViewModel = (product: Product) => {
  const productImagesList: string[] = [
    product.image1,
    product.image2,
    product.image3,
  ];

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);
  const { shoppingBag, saveItem } = useContext(ShoppingBagContext);
  console.log("Bolsa de compras : " + JSON.stringify(shoppingBag));

  useEffect(() => {
    const index = shoppingBag.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      //EL PRODUCTO SI EXISTE
      setQuantity(shoppingBag[index].quantity!);
    }
  }, [shoppingBag]);

  useEffect(() => {
    setPrice(product.price * quantity);
  }, [quantity]);

  const addToBag = () => {
    if (quantity > 0) {
      product.quantity = quantity;
      saveItem(product);
    }
  };

  const addItem = () => {
    setQuantity(quantity + 1);
  };

  const removeItem = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return {
    quantity,
    price,
    productImagesList,
    shoppingBag,
    addItem,
    addToBag,
    removeItem,
  };
};

export default ClientProductDetailViewModel;
