import { ShoppingBagRepositoryImpl } from "../../../Data/repositories/ShoppingBagRepository";

const { clearShoppingBag } = new ShoppingBagRepositoryImpl();

export const ClearShoppingBagUseCase = async () => {
  return await clearShoppingBag();
};
