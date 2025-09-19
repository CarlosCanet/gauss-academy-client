import { useEffect, useState } from "react";
import type { Teacher } from "../types/user";
import { Alert, Container, Grid, Typography } from "@mui/material";
import { getPublicInfoFromAllTeachers } from "../services/user.services";
import LoadingGauss from "../components/UI/LoadingGauss";
import TeacherPublicCard from "../components/user/TeacherPublicCard";

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Teachers
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {teachers.length === 0 ? (
          <Grid size={12}>
            <LoadingGauss />
          </Grid>
        ) : (
          teachers.map((teacher) => (
            <Grid key={teacher._id} size={{ xs: 12, sm: 6, md: 4, lg: 6 }} display="flex" alignItems="stretch">
              <TeacherPublicCard {...teacher} />
            </Grid>
          ))
        )}
        {showErrorAlert && (
          <Alert severity="error" sx={{ my: 2 }}>
            There was an error with the teachers. Please try again.
          </Alert>
        )}
      </Grid>
    </Container>
  );
}
export default TeachersPage;
