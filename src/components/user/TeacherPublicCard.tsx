import { Card, CardContent, Typography, Grid, Avatar, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import type { Teacher } from "../../types/user";

type TeacherPublicInfoProps = Omit<Teacher, "_id" | "dateOfBirth" | "email" | "password" | "dni" | "mobileNumber" | "role">;

function TeacherPublicCard(props: TeacherPublicInfoProps) {
  const fullName = `${props.firstName} ${props.lastName}`.trim();
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12}}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, gap: 2 }}>
              <Avatar
                sx={{ width: 80, height: 80, mr: 2 }}
                alt={fullName}
                src={props.profileImageUrl}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Profesor
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
              <PersonIcon color="action" fontSize="small" sx={{ mt: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {props.teacherProfile.description || "Sin descripción disponible"}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <AutoStoriesIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Cursos activos: {props.teacherProfile.activeCourses?.join(", ") ?? ""}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <SchoolIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Cursos previos: {props.teacherProfile.previousCourses?.join(", ") ?? ""}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default TeacherPublicCard;
