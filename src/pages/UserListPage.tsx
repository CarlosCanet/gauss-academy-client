import { useEffect, useState } from "react";
import UserList from "../components/user/UserList";
import { getAllUsers } from "../services/user.services";
import type { User } from "../types/user";
import LoadingGauss from "../components/UI/LoadingGauss";
import { Alert } from "@mui/material";

function UserListPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const users = await getAllUsers();
      setUserList(users);
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };
  return (
    <>
      {userList.length === 0 ? <LoadingGauss /> : <UserList userList={userList} setUserList={setUserList} />}
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the user list. Please try again.
        </Alert>
      )}
    </>
  );
}
export default UserListPage;
