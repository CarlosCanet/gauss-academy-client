import { Grid, Typography } from "@mui/material";
import MethodologyCard from "../../components/main/MethodologyCard";

function MainPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom align="center">
        Gauss Academy
      </Typography>
      <Grid container spacing={2}>
        <Grid size={10} offset={1}>
          <MethodologyCard cardImg="https://picsum.photos/500/500" cardTitle="First Thing" cardContent="Come to Gauss Academy" />
        </Grid>
        <Grid size={10} offset={1}>
          <MethodologyCard cardImg="https://picsum.photos/500/400" cardTitle="Second Thing" cardContent="Enroll today!" />
        </Grid>
      </Grid>
    </>
  );
}
export default MainPage;
