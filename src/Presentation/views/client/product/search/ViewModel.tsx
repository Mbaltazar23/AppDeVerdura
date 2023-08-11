import { useState } from 'react';
import { GetProductsByNameUseCase } from '../../../../../Domain/useCases/product/GetProductsByName';
import { Product } from '../../../../../Domain/entities/Product';

const ClientProductSearchViewModel = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showMessage, setShowMessage] = useState(false);


  const handleSearch = async (text: string) => {
    try {
      if (text.trim() === '') {
        setProductList([]);
      } else {
        const filteredProducts = await GetProductsByNameUseCase(text);
        setProductList(filteredProducts);
      }
    } catch (error) {
      console.log('Error al obtener los productos:', error);
      setProductList([]);
    }
  };

  const handleAddToCart = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Ocultar el mensaje después de 10 segundos
  };

  return {
    productList,
    handleSearch,
    searchText,
    setSearchText,
    showMessage,
    setShowMessage,
    handleAddToCart
  };
};

export default ClientProductSearchViewModel;
