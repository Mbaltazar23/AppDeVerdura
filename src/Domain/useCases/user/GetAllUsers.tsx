import { UserRepositoryImp } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";

const { getAllClients } = new UserRepositoryImp();

export const GetAllUsersUseCase = async (user: User) => {
  return await getAllClients(user);
};
