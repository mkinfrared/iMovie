import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { AdminRoutes } from "routes/Routes.type";

import css from "./CinemaCard.module.scss";
import { CinemaCardProps } from "./CinemaCard.type";

const CinemaCard = ({
  cinemaId,
  cinemaName,
  cityName,
  countryName,
  stateName,
  zipcode,
  onEdit
}: CinemaCardProps) => {
  const handleEditClick = useCallback(() => {
    onEdit(cinemaId);
  }, [cinemaId, onEdit]);

  return (
    <Card className={css.CinemaCard} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="primary"
          align="center"
        >
          {cinemaName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Details
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          City:{" "}
          <Typography component="span" color="textSecondary">
            {cityName}
          </Typography>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          State:{" "}
          <Typography component="span" color="textSecondary">
            {stateName}
          </Typography>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Country:{" "}
          <Typography component="span" color="textSecondary">
            {countryName}
          </Typography>
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Zipcode:{" "}
          <Typography component="span" color="textSecondary">
            {zipcode}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleEditClick} data-testid="editButton">
          Edit
        </Button>
        <Link to={`${AdminRoutes.ADMIN_CINEMA}/${cinemaId}`}>
          <Button size="small" color="primary">
            More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default React.memo(CinemaCard);
