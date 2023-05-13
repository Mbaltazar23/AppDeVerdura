import { AxiosError } from "axios";
import { ImageInfo } from "expo-image-picker";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDeVerdura,ApiDeVerduraWithImage } from "../sources/remote/api/ApiDeVerdura";
import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import mime from "mime";

export class AuthRepositoryImpl implements AuthRepository {
  
  async register(user: User): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiDeVerdura>(
        "/users/create",
        user
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async registerWithImage(
    user: User,
    file: ImageInfo
  ): Promise<ResponseApiDeVerdura> {
    try {
      let data = new FormData();
      data.append("image", {
        uri: file.uri,
        // @ts-ignore
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri)!,
      });
      data.append("user", JSON.stringify(user));
      const response = await ApiDeVerduraWithImage.post<ResponseApiDeVerdura>(
        "/users/createWithImage",
        data
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }

  async login(email: string, password: string): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.post<ResponseApiDeVerdura>(
        "/users/login",
        {
          email: email,
          password: password,
        }
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDeVerdura = JSON.parse(
        JSON.stringify(e.response?.data)
      );
      return Promise.resolve(apiError);
    }
  }
}
