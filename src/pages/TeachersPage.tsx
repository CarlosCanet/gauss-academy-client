import { useEffect, useState } from "react";
import type { Teacher } from "../types/user";
import { service } from "../services/config.services";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/user/teachers/info");
      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">Teachers</Typography>
      <List>
        {teachers.map(teacher => {
          return (
            <ListItem key={teacher._id}>
              <ListItemText primary={`${teacher.firstName} ${teacher.lastName}`} />
            </ListItem>
          );
         })}
      </List>
    </div>
  )
}
export default TeachersPage