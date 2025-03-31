import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">"{review.comment}"</Typography>
        <Typography variant="body2" color="text.secondary">
          - {review.userName}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Rating: {review.rating} ⭐
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
