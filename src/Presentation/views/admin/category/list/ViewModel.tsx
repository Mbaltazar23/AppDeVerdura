import { useState, useContext } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryListViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const { categories, getCategories, remove } = useContext(CategoryContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleDeleteCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDeleteCategory = () => {
    if (selectedCategoryId) {
      deleteCategory(selectedCategoryId);
    }
    setSelectedCategoryId(null);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDeleteCategory = () => {
    setSelectedCategoryId(null);
    setShowDeleteConfirmation(false);
  };

  const deleteCategory = async (idCategory: string) => {
    const result = await remove(idCategory);
    setResponseMessage(result.message);
  };

  return {
    categories,
    responseMessage,
    deleteCategory,
    getCategories,
    showDeleteConfirmation,
    handleDeleteCategory,
    handleConfirmDeleteCategory,
    handleCancelDeleteCategory,
  };
};

export default AdminCategoryListViewModel;
