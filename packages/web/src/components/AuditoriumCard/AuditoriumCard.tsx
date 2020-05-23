import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

import { AdminRoutes } from "routes/Routes.type";

import css from "./AuditoriumCard.module.scss";
import { AuditoriumCardProps } from "./AuditoriumCard.type";

const AuditoriumCard = ({
  name,
  seats,
  cinemaId,
  auditoriumId
}: AuditoriumCardProps) => {
  return (
    <Card className={css.AuditoriumCard} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="primary"
          align="center"
        >
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Details
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Seats:{" "}
          <Typography component="span" color="textSecondary">
            {seats}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`${AdminRoutes.ADMIN_CINEMA}/${cinemaId}/${auditoriumId}/edit`}
        >
          <Button size="small" color="primary">
            More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default React.memo(AuditoriumCard);
