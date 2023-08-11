import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const HomeViewModel = () => {
  const { user, getUserSession } = useContext(UserContext);
  return {
    user,
    getUserSession,
  };
};

export default HomeViewModel;
