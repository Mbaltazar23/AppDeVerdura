import { Rol } from "./Rol";
import { Address } from "./Address";

export interface User {
  id?: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  created_at_register?: string;
  confirmPassword: string;
  image: string;
  session_token?: string;
  roles: Rol[];
  address?: Address | any;
}
