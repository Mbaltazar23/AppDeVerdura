export interface ResponseApiTransbank {
  success: boolean;
  message: string;
  data: Transbank;
}

export interface Transbank {
  token: string;
  url: string;
}
