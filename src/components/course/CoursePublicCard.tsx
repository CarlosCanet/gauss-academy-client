import type { Course, CourseStatus } from "../../types/types";
import { Card, CardContent, Typography, Grid, Chip, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";

type CoursePublicInfoProps = Omit<Course, "_id" | "slug" | "teachers" | "classes">;

const getStatusColor = (status: CourseStatus) => {
  switch (status) {
    case "Active":
      return "success";
    case "Planned":
      return "warning";
    case "Finished":
      return "default";
    default:
      return "default";
  }
};

function CoursePublicCard(props: CoursePublicInfoProps) {
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
      }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: (theme) => theme.palette.primary.main,
          }}>
          {props.name}
        </Typography>

        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Chip label={props.status} color={getStatusColor(props.status)} size="small" sx={{ fontWeight: "medium" }} />
            </Box>
          </Grid>

          <Grid size={{ xs: 4, lg: 4 }} offset={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <CalendarTodayIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Inicio: {props.startDate.toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4, lg: 3 }} offset={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <AccessTimeIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {props.numberOfHours ?? "?"} horas
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 8, lg: 8 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <SchoolIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary" sx={{ 
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                Titulaciones: {props.degreeNames.join(", ")}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4, lg: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                backgroundColor: (theme) => theme.palette.primary.main + "10",
                p: 1.5,
                borderRadius: 1,
              }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                {props.price} €
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default CoursePublicCard;
