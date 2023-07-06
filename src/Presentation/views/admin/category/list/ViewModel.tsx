import  { useState, useContext } from "react";
import { CategoryContext } from "../../../../context/CategoryContext";

const AdminCategoryListViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("")
  const {categories,getCategories, remove} = useContext(CategoryContext)


  const deleteCategory = async (idCategory: string) => {
    const result = await remove(idCategory);
    setResponseMessage(result.message)
  };

  return {
    categories,
    responseMessage,
    deleteCategory,
    getCategories
  };
};

export default AdminCategoryListViewModel;
