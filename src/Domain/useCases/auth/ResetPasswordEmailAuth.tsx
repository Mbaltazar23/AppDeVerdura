import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const { resetPasswordEmail } = new AuthRepositoryImpl();

export const ResetPasswordAuthUseCase = async (email: string) => {
  return await resetPasswordEmail(email);
};
