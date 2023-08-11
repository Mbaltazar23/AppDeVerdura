import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

const AdminUserListViewModel = () => {
  const { user, users, getAllUsers } = useContext(UserContext);

  return {
    user,
    users,
    getAllUsers
  };
};

export default AdminUserListViewModel;
