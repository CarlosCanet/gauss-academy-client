import { Grid, Typography } from "@mui/material"
import MethodologyCard from "../../components/main/MethodologyCard"

function MethodologyPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom align="center">Methodology</Typography>
      <Grid container spacing={2}>
        <Grid size={10} offset={1}>
          <MethodologyCard cardImg="https://picsum.photos/500/500" cardTitle="First methodology" cardContent="Things to do" />
        </Grid>
        <Grid size={10} offset={1}>
          <MethodologyCard cardImg="https://picsum.photos/500/300" cardTitle="Second methodology" cardContent="More things to do" />
        </Grid>
      </Grid>
    </>
  )
}
export default MethodologyPage