import { Container, Grid, Typography } from "@mui/material"
import MethodologyCard from "../components/UI/MethodologyCard"
import Asking from "../assets/Asking.jpg"
import Mastery from "../assets/Mastery.jpg"
import Teachers from "../assets/Teachers.jpg"

function MethodologyPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Methodology
      </Typography>
      
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={10} offset={1}>
          <MethodologyCard
            cardImg={Teachers}
            cardTitle="Evidence-Based Teaching"
            cardContent="We use teaching methods supported by educational research—active retrieval, spaced practice and worked examples—to increase long-term retention and transfer."
          />
        </Grid>

        <Grid size={10} offset={1}>
          <MethodologyCard
            cardImg={Mastery}
            cardTitle="Scaffolding & Mastery"
            cardContent="Complex topics are broken into sequenced modules with guided practice and gradual release so students build confident mastery before advancing."
          />
        </Grid>

        <Grid size={10} offset={1}>
          <MethodologyCard
            cardImg={Asking}
            cardTitle="Continuous Assessment & Feedback"
            cardContent="Regular low-stakes assessments and timely feedback help students identify gaps early and iterate on skills with instructor and peer guidance."
          />
        </Grid>
      </Grid>
    </Container>
  )
}
export default MethodologyPage