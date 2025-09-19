import { Box, Container, Grid, Typography } from "@mui/material";
import MethodologyCard from "../components/UI/MethodologyCard"; 
import Classrooms from "../assets/Classrooms.jpg"
import Writing from "../assets/Writing.jpg"
import ProjectWorking from "../assets/ProjectWorking.jpg"
import Faculty from "../assets/Faculty.jpg"
import Internships from "../assets/Internships.jpg"


function ParallaxSection({
  children,
  backgroundImage,
  minHeight = "100vh",
  overlay = true,
}: {
  children: React.ReactNode;
  backgroundImage: string;
  minHeight?: string;
  overlay?: boolean;
}) {
  // Parallax implemented with a fixed background layer via CSS positioning and z-indexing.
  // We removed the JS scroll listener to avoid repaint artifacts; if we want
  // per-section dynamic parallax later, compute offset relative to the section.

  return (
    <Box
      sx={{
        position: "relative",
        minHeight,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
      {overlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          color: overlay ? "white" : "inherit",
        }}>
        {children}
      </Box>
    </Box>
  );
}

function MainPage() {
  return (
    <Box sx={{ perspective: "1px", transformStyle: "preserve-3d", overflowX: "hidden",  }}>
  <ParallaxSection backgroundImage={Classrooms} minHeight="60vh" overlay={true}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "3rem", md: "4.5rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              mb: 4,
            }}>
            Gauss Academy
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 8,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}>
            Great math, code and engineering academy
          </Typography>
        </Container>
      </ParallaxSection>

      <Box sx={{ bgcolor: "background.paper", position: "relative", zIndex: 4 }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid size={10} offset={1}>
              <MethodologyCard
                cardImg={ProjectWorking}
                cardTitle="Active, Project-Based Learning"
                cardContent="Students learn by doing: hands-on projects, collaborative problem-solving, and real-world case studies that build deep understanding and transferable skills."
              />
            </Grid>
            <Grid size={10} offset={1}>
              <MethodologyCard
                cardImg={Faculty}
                cardTitle="Expert Faculty & Mentors"
                cardContent="Learn from accomplished academics and industry professionals who bring research, practical experience and personalized mentorship to every course."
              />
            </Grid>
            <Grid size={10} offset={1}>
              <MethodologyCard
                cardImg={Internships}
                cardTitle="Career Preparation & Internships"
                cardContent="Career services, internship placements and industry partnerships help students launch careers, network with employers and gain relevant experience before graduation."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

  <ParallaxSection backgroundImage={Writing} minHeight="30vh">
        <Container maxWidth="lg" sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              mb: 4,
            }}>
            Enroll now!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}>
            You'll have more chance to pass your university tests!
          </Typography>
        </Container>
      </ParallaxSection>
    </Box>
  );
}
export default MainPage;
