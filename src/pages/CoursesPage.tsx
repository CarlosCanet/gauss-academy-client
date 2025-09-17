// import { useState } from "react";

import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { service } from "../services/config.services";
import type { Course } from "../types/types";

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/course/info");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">Courses</Typography>
      <List>
        {courses.map(course => {
          return (
            <ListItem key={course._id}>
              <ListItemText primary={course.name} />
            </ListItem>
          );
         })}
      </List>
    </div>
  )
}
export default CoursesPage