import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { Alert, Avatar, Box, Chip, Typography, type ChipProps } from "@mui/material";
import { ROLE_TYPES, type Role, type Teacher, type User } from "../../types/user";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import type { GridRowModel } from "@mui/x-data-grid";
import { assignRoleToUser, updateTeacherDescription } from "../../services/user.services";

type PropsCourseList = {
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
};

function UserList(props: PropsCourseList) {
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const { role } = useContext(AuthContext);
  const [rows, setRows] = useState<GridRowsProp>([]);
  useEffect(() => {
    setRows(
      props.userList.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        dni: user.dni,
        mobileNumber: user.mobileNumber,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        description: (user as Teacher).teacherProfile?.description ?? undefined,
      }))
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
  const extraColumns: GridColDef[] = [];
  if (role === "Admin") {
    extraColumns.push({
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: ROLE_TYPES,
      editable: true,
      renderCell: (params) => (
        <Chip label={params.value} color={colorBadge(params.value)} variant={params.value === "Student" ? "outlined" : "filled"} />
      ),
    });
  }
  if (role === "Admin" || role === "Teacher") {
    extraColumns.push({ field: "description", headerName: "Description", editable: true, flex: 1 });
  }

  const columns = [...baseColumns, ...extraColumns];

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const changeFields = Object.keys(newRow).filter((field) => newRow[field] !== oldRow[field]);
    try {
      if (changeFields.includes("role")) {
        await assignRoleToUser(newRow.id, newRow.role);
      }
      if (changeFields.includes("description") && newRow.role === "Teacher") {
        await updateTeacherDescription(newRow.id, newRow.description);
      }
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
    setRows((prevRows) => prevRows.map((row) => (row.id == newRow.id ? { ...row, ...newRow } : row)));
    return newRow;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: { xs: 2, md: 4 },
        height: "100%",
        maxWidth: "100%",
      }}>
      <Typography variant="h3" align="center">
        Users
      </Typography>
      <Box sx={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} processRowUpdate={processRowUpdate} />
        {showErrorAlert && (
          <Alert severity="error" sx={{ my: 2 }}>
            There was an error with the user list. Please try again.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
export default UserList;
