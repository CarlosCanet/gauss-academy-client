// import { useState } from "react";

import { Alert, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Course } from "../types/types";
import { getPublicInfoFromAllActiveCourses } from "../services/course.services";
import LoadingGauss from "../components/UI/LoadingGauss";

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const courses = await getPublicInfoFromAllActiveCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Courses
      </Typography>
      {courses.length === 0 ? (
        <LoadingGauss />
      ) : (
        <List>
          {courses.map((course) => {
            return (
              <ListItem key={course._id}>
                <ListItemText primary={course.name} />
              </ListItem>
            );
          })}
        </List>
      )}
      {showErrorAlert && (
        <Alert severity="error" sx={{ my: 2 }}>
          There was an error with the courses. Please try again.
        </Alert>
      )}
    </div>
  );
}
export default CoursesPage;
