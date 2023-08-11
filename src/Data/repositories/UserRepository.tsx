import { AxiosError } from "axios";
import { ImagePickerAsset } from "expo-image-picker";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import {
  ApiDeVerdura,
  ApiDeVerduraWithImage,
} from "../sources/remote/api/ApiDeVerdura";
import { ResponseApiDeVerdura } from "../sources/remote/models/ResponseApiDeVerdura";
import { User } from "../../Domain/entities/User";
import mime from "mime";

export class UserRepositoryImp implements UserRepository {
  async getAllClients(user: User): Promise<User[]> {
    try {
      const response = await ApiDeVerdura.get<User[]>(
        `/users/findAll/${user.id}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async update(user: User): Promise<ResponseApiDeVerdura> {
    try {
      const response = await ApiDeVerdura.put<ResponseApiDeVerdura>(
        "/users/updateWithoutImage",
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

  async updateWithImages(
    user: User,
    file: ImagePickerAsset
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
      const response = await ApiDeVerduraWithImage.put<ResponseApiDeVerdura>(
        "/users/update",
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
}
