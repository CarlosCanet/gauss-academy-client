import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import type { User } from "../../types/user";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

type PropsCourseList = {
  userList: User[];
};

function UserList(props: PropsCourseList) {
  const { role } = useContext(AuthContext)
  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First name" },
    { field: "lastName", headerName: "Last name" },
    { field: "dateOfBirth", headerName: "Date of birth" },
    { field: "email", headerName: "email" },
    { field: "dni", headerName: "dni" },
    { field: "mobileNumber", headerName: "Mobile number" },
    { field: "profileImageUrl", headerName: "Profile Image" },
  ];
  if (role === "Admin") {
    columns.push({ field: "role", headerName: "role" });
  }

  const rows: GridRowsProp = props.userList.map((user) => {
    const baseRow = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      dni: user.dni,
      mobileNumber: user.mobileNumber,
      profileImageUrl: user.profileImageUrl
    } 
    if (role === "Admin") {
      return { ...baseRow, role: user.role };
    }
    return baseRow;
  });

  return (
    <div>
      <Typography variant="h3" align="center">
        Users
      </Typography>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
export default UserList;
