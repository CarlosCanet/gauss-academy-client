// import { useState } from "react";

import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import type { Course } from "../types/types";
import { getPublicInfoFromAllActiveCourses } from "../services/course.services";

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const courses = await getPublicInfoFromAllActiveCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
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