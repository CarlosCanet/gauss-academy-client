// import { useState } from "react";

import { Alert, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Course } from "../types/types";
import { getPublicInfoFromAllActiveCourses } from "../services/course.services";
import LoadingGauss from "../components/UI/LoadingGauss";
import CoursePublicCard from "../components/course/CoursePublicCard";

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Courses
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {courses.length === 0 ? (
          <Grid size={12}>
            <LoadingGauss />
          </Grid>
        ) : (
          courses.map((course) => (
            <Grid key={course._id} size={{ xs: 12, sm: 6, md: 4, lg: 6 }} display="flex" alignItems="stretch">
              <CoursePublicCard {...course} />
            </Grid>
          ))
        )}
        {showErrorAlert && (
          <Grid size={12}>
            <Alert severity="error" sx={{ my: 2 }}>
              There was an error with the courses. Please try again.
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
export default CoursesPage;
