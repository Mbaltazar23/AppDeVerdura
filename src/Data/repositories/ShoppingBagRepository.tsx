import { ShoppingBagRepository } from "../../Domain/repositories/ShoppingBagRepository";
import { LocalStorage } from "../sources/local/LocalStorage";
import { Product } from "../../Domain/entities/Product";

export class ShoppingBagRepositoryImpl implements ShoppingBagRepository {
  async save(products: Product[]): Promise<void> {
    const { save } = LocalStorage();
    await save("shopping_bag", JSON.stringify(products));
  }

  async getShoppingBag(): Promise<Product[]> {
    const { getItem } = LocalStorage();
    const data = await getItem("shopping_bag");
    const shoppingBag: Product[] = JSON.parse(data as any);
    if (shoppingBag === null) {
      return [];
    } else {
      return shoppingBag;
    }
  }

  async clearShoppingBag(): Promise<void> {
    const { remove } = LocalStorage();
    await remove("shopping_bag");
  }
}
