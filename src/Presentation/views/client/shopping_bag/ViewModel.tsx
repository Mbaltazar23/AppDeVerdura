import { useContext, useState } from "react";
import { ShoppingBagContext } from "../../../context/ShoppingBagContext";
import { Product } from "../../../../Domain/entities/Product";

const ClientShoppingBagViewModel = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { shoppingBag, saveItem, deleteItem, total } =
    useContext(ShoppingBagContext);

  const getShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Ocultar el mensaje después de 10 segundos  };
  }
  
  const addItem = async (product: Product) => {
    product.quantity = product.quantity! + 1;
    await saveItem(product);
  };

  const subtractItem = async (product: Product) => {
    if (product.quantity! > 1) {
      product.quantity = product.quantity! - 1;
      await saveItem(product);
    }
  };

  return {
    shoppingBag,
    total,
    addItem,
    subtractItem,
    deleteItem,
    showMessage,
    getShowMessage,
    setShowMessage,
  };
};

export default ClientShoppingBagViewModel;
