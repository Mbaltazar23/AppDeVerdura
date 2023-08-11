export interface ResponseStatusTransbank {
  success: boolean;
  message: string;
  data: ResponseTransbank | any;
}

export interface ResponseTransbank {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  card_detail: CardDetail;
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_amount: number;
  installments_number: number;
  balance: number;
}

export interface CardDetail {
  card_number: string;
}
