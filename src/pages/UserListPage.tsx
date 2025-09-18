import { useEffect, useState } from "react";
import UserList from "../components/user/UserList"
import { getAllUsers } from "../services/user.services";
import type { User } from "../types/user";
import LoadingGauss from "../components/UI/LoadingGauss";

function UserListPage() {
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const users = await getAllUsers();
      setUserList(users);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
     {userList.length === 0 ? <LoadingGauss /> : <UserList userList={userList} setUserList={setUserList} />}
    </>
  )
}
export default UserListPage