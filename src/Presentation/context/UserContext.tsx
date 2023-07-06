import React, { createContext, useEffect, useState } from "react";
import { ClearShoppingBagUseCase } from "../../Domain/useCases/shopping_bag/ClearShoppingBag";
import { RemoveUserLocalUseCase } from "../../Domain/useCases/userLocal/RemoveUserLocal";
import { SaveUserLocalUseCase } from "../../Domain/useCases/userLocal/SaveUserLocal";
import { GetUserLocalUseCase } from "../../Domain/useCases/userLocal/GetUserLocal";
import { User } from "../../Domain/entities/User";

export const userInitialState: User = {
  id: "",
  name: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: "",
  session_token: "",
  roles: [],
};

export interface UserConextProps {
  user: User;
  saveUserSesion: (user: User) => Promise<void>;
  getUserSession: () => Promise<void>;
  removeUserSession: () => Promise<void>;
}

export const UserContext = createContext({} as UserConextProps);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(userInitialState);

  useEffect(() => {
    getUserSession();
  }, []);

  const saveUserSesion = async (user: User) => {
    await SaveUserLocalUseCase(user);
    setUser(user);
  };

  const getUserSession = async () => {
    const user = await GetUserLocalUseCase();
    setUser(user);
  };

  const removeUserSession = async () => {
    await RemoveUserLocalUseCase();
    await ClearShoppingBagUseCase()
    setUser(userInitialState);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        saveUserSesion,
        getUserSession,
        removeUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
