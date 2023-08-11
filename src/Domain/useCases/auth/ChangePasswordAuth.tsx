import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const { changePassword } = new AuthRepositoryImpl();

export const ChangePasswordAuthUseCase = async (
  email: string,
  password: string
) => {
  return await changePassword(email, password);
};
