import { Box, CircularProgress, Typography, keyframes } from "@mui/material";
import { useEffect, useState } from "react";

const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

function LoadingGauss() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 3,
        animation: `${pulse} 2s ease-in-out infinite`,
      }}>
      <CircularProgress size={100} thickness={6} color="primary" />
      <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 500, textAlign: "center", maxWidth: "600px", px: 2 }}>
        Loading Gauss Academy
        <Typography variant="inherit" sx={{ display: "inline-block", width: "1.5em", textAlign: "left" }} aria-label="loading dots">
          {dots}
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, opacity: 0.8 }}>
          This might take up to one minute while we prepare your content
        </Typography>
      </Typography>
    </Box>
  );
}

export default LoadingGauss;
