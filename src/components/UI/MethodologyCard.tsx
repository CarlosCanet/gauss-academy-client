import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function MethodologyCard({ cardImg, cardImgAlt, cardTitle, cardContent }: { cardImg?: string, cardImgAlt?: string, cardTitle: string; cardContent: string }) {
  return (
    <Card>
      {cardImg && 
        <CardMedia component="img" image={cardImg} alt={cardImgAlt} height="200" />
      }
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          {cardTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} gutterBottom component="div">
          {cardContent}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default MethodologyCard;
