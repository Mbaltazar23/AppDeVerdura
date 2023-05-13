import { UserRepositoryImp } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";
import * as ImagePicker from "expo-image-picker";
const { updateWithImages } = new UserRepositoryImp();

export const UdpateWithImageUserUseCase = async (
  user: User,
  file: ImagePicker.ImageInfo
) => {
  return await updateWithImages(user, file);
};
