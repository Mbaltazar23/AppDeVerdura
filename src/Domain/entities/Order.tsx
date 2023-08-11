import { Address } from "./Address";
import { Payment } from "./Payment";
import { Product } from "./Product";
import { User } from "./User";

export interface Order {
  id?: string;
  id_client: string;
  id_address: string;
  status?: string;
  lat?: number;
  lng?: number;
  timestamp?: number;
  client?: User;
  address?: Address;
  products: Product[];
  payment?: Payment;
  process?: number;
  transbank?: dataTransbank;
}

export interface dataTransbank {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  card_detail: cardDetail;
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_amount: number;
  installments_number: number;
  balance: number;
}

export interface cardDetail {
  card_number: string;
}
