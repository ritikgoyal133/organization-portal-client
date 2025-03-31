import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const TripCard = ({ trip }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={trip.image || "/default-trip.jpg"}
        alt={trip.destination}
      />
      <CardContent>
        <Typography variant="h6">{trip.destination}</Typography>
        <Typography variant="body2" color="text.secondary">
          {trip.description}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Date: {new Date(trip.date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TripCard;
