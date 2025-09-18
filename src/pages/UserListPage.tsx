import { useEffect, useState } from "react";
import UserList from "../components/user/UserList"
import { getAllUsers } from "../services/user.services";
import type { User } from "../types/user";

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
    <UserList userList={userList} setUserList={setUserList}/>
  )
}
export default UserListPage