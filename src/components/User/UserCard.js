import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import "./UserCard.css"; // Import styles

const UserCard = ({ user, onViewDetails }) => {
  return (
    <Card className="card-container">
      <CardMedia
        component="img"
        height="140"
        image={user.photoURL || "/default-user.png"}
        alt={user.name}
      />
      <CardContent className="card-content">
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.description || "No bio available"}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Trips Taken: {user.tripCount}
        </Typography>
        <Button
          className="card-button"
          variant="contained"
          onClick={() => onViewDetails(user)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
