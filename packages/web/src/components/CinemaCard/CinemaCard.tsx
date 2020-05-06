import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";

import css from "./CinemaCard.module.scss";
import { CinemaCardProps } from "./CinemaCard.type";

const CinemaCard = ({
  cinemaName,
  cityName,
  countryName,
  stateName,
  zipcode
}: CinemaCardProps) => {
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
        <Button size="small" color="primary">
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(CinemaCard);
