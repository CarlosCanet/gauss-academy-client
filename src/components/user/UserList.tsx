import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { Avatar, Chip, Typography, type ChipProps } from "@mui/material";
import { ROLE_TYPES, type Role, type User } from "../../types/user";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import type { GridRowModel } from "@mui/x-data-grid";
import { assignRoleToUser } from "../../services/user.services";

type PropsCourseList = {
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
};

function UserList(props: PropsCourseList) {
  const { role } = useContext(AuthContext);
  const [rows, setRows] = useState<GridRowsProp>([]);
  useEffect(() => {
    setRows(
      props.userList.map((user) => {
        const baseRow = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          email: user.email,
          dni: user.dni,
          mobileNumber: user.mobileNumber,
          profileImageUrl: user.profileImageUrl,
        };
        if (role === "Admin") {
          return { ...baseRow, role: user.role };
        }
        return baseRow;
      })
    );
  }, [props.userList, role]);

  const baseColumns: GridColDef[] = [
    {
      field: "profileImageUrl",
      headerName: "Profile Image",
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { field: "firstName", headerName: "First name" },
    { field: "lastName", headerName: "Last name" },
    { field: "dateOfBirth", headerName: "Date of birth", type: "date" },
    { field: "email", headerName: "Email" },
    { field: "dni", headerName: "DNI" },
    { field: "mobileNumber", headerName: "Mobile number" },
  ];
  const colorBadge = (role: Role): ChipProps["color"] => {
    switch (role) {
      case "Admin":
        return "error";
      case "Teacher":
        return "primary";
      case "Student":
        return "secondary";
      case "Staff":
        return "warning";
      default:
        return "default";
    }
  };
  const adminColumns: GridColDef[] = [
    ...baseColumns,
    {
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: ROLE_TYPES,
      editable: true,
      renderCell: (params) => (
        <Chip label={params.value} color={colorBadge(params.value)} variant={params.value === "Student" ? "outlined" : "filled"} />
      ),
    },
  ];

  const columns = role === "Admin" ? adminColumns : baseColumns;

  const processRowUpdate = async (newRow: GridRowModel) => {
    try {
      await assignRoleToUser(newRow.id, newRow.role);
    } catch (error) {
      console.log(error);
    }
    setRows((prevRows) => prevRows.map((row) => (row.id == newRow.id ? { ...row, ...newRow } : row)));
    return newRow;
  };

  return (
    <div>
      <Typography variant="h3" align="center">
        Users
      </Typography>
      <div style={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} processRowUpdate={processRowUpdate} />
      </div>
    </div>
  );
}
export default UserList;
