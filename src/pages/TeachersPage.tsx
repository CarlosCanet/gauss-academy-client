import { useEffect, useState } from "react";
import type { Teacher } from "../types/user";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { getPublicInfoFromAllTeachers } from "../services/user.services";
import LoadingGauss from "../components/UI/LoadingGauss";

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const teachers = await getPublicInfoFromAllTeachers();
      setTeachers(teachers);
    } catch (error) {
      console.error(error);
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
    </div>
  );
}
export default TeachersPage;
