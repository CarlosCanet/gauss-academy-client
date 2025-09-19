import { Box, Container, Grid, Typography } from "@mui/material"

function NotFoundPage() {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid size={6} offset={3}>
            <Typography variant="h2" gutterBottom align="center">Not Found</Typography>
            <Typography variant="h6" gutterBottom align="center">The page you are looking for doesn't exist</Typography>
          </Grid>
          <Grid size={6} offset={3}>
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXNmYm13YjBhd3hkc2k3dGc0eDBpdm5zN3JscDJ0MTk1OWM1aTNsYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3rgXBARL7tEj1NdC0w/giphy.gif" alt="Funny image" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default NotFoundPage