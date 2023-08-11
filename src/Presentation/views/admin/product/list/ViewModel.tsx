import React, { useContext, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";

const AdminProductListViewModel = () => {
  const { products, getProducts, remove } = useContext(ProductContext);

  const [responseMessage, setResponseMessage] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<Product | null>();

  const handleDeleteProduct = (product: Product) => {
    setSelectedProductId(product);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDeleteProduct = () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId);
    }
    setSelectedProductId(null);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDeleteProduct = () => {
    setSelectedProductId(null);
    setShowDeleteConfirmation(false);
  };

  const deleteProduct = async (product: Product) => {
    const result = await remove(product);
    setResponseMessage(result.message);
  };

  return {
    products,
    responseMessage,
    getProducts,
    showDeleteConfirmation,
    handleDeleteProduct,
    handleConfirmDeleteProduct,
    handleCancelDeleteProduct,
  };
};

export default AdminProductListViewModel;
