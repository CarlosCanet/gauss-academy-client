import { Box, Container, Grid, Typography } from "@mui/material"

function ErrorPage() {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid size={6} offset={3}>
            <Typography variant="h2" gutterBottom align="center">Error</Typography>
            <Typography variant="h6" gutterBottom align="center">Something went wrong... Sorry</Typography>
          </Grid>
          <Grid size={6} offset={3}>
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHd1a2JxZ2tnZ2ZkaXBuaDlwM3JhZGU0aHU0NWdiOTNkeHRkbmZ6aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vVKqa0NMZzFyE/giphy.gif" alt="Funny image" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default ErrorPage