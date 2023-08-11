import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { User } from "../entities/User";
import * as ImagePicker from "expo-image-picker";

export interface UserRepository {
  getAllClients(user:User): Promise<User[]>;
  update(user: User): Promise<ResponseApiDeVerdura>;
  updateWithImages(
    user: User,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
}
