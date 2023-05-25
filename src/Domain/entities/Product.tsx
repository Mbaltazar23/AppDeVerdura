export interface Product {
  id?: string;
  name: string;
  description: string;
  image: string;
  price: number | any;
  id_category: string | undefined;
  quantity?: number;
}
