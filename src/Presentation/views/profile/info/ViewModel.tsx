import React, { useContext } from "react";
import { RemoveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/RemoveUserLocal";
import { UserConext } from "../../../context/UserContext";

const ProfileInfoViewModel = () => {
  //const { user } = useUserLocal();
const {user, removeUserSession } =useContext(UserConext)

  return {
    removeUserSession,
    user,
  };
};

export default ProfileInfoViewModel;
