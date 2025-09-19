import { useEffect, useState } from "react";
import type { Teacher } from "../types/user";
import { Alert, List, ListItem, ListItemText, Typography } from "@mui/material";
import { getPublicInfoFromAllTeachers } from "../services/user.services";
import LoadingGauss from "../components/UI/LoadingGauss";

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const teachers = await getPublicInfoFromAllTeachers();
      setTeachers(teachers);
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Teachers
      </Typography>
      {teachers.length === 0 ? (
        <LoadingGauss />
      ) : (
        <List>
          {teachers.map((teacher) => {
            return (
              <ListItem key={teacher._id}>
                <ListItemText primary={`${teacher.firstName} ${teacher.lastName}`} />
              </ListItem>
            );
          })}
        </List>
      )}
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the teachers. Please try again.
        </Alert>
      )}
    </div>
  );
}
export default TeachersPage;
