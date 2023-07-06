import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const ProfileInfoViewModel = () => {
  //const { user } = useUserLocal();
const {user, removeUserSession } = useContext(UserContext)

  return {
    removeUserSession,
    user,
  };
};

export default ProfileInfoViewModel;
