import { ResponseApiDeVerdura } from "../../Data/sources/remote/models/ResponseApiDeVerdura";
import { User } from "../entities/User";
import * as ImagePicker from "expo-image-picker";

export interface AuthRepository {

  login(email: string, password: string): Promise<ResponseApiDeVerdura>;
  register(user: User): Promise<ResponseApiDeVerdura>;
  registerWithImage(
    user: User,
    file: ImagePicker.ImageInfo
  ): Promise<ResponseApiDeVerdura>;
  resetPasswordEmail(email: string) : Promise<ResponseApiDeVerdura>

  changePassword(email: string, password: string) : Promise<ResponseApiDeVerdura>
}
