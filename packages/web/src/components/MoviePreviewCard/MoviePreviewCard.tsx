import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useCallback, useRef } from "react";

import useWindowResize from "hooks/useWindowResize";
import Image from "ui/Image";
import classNames from "utils/classNames";

import css from "./MoviePreviewCard.module.scss";
import { MoviePreviewCardProps } from "./MoviePreviewCard.type";

const MoviePreviewCard = ({
  id,
  title,
  imageUrl,
  overview,
  popularity,
  releaseDate,
  className
}: MoviePreviewCardProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const resizeImage = useCallback(() => {
    const { current } = imageRef;

    if (!current || window.innerWidth > 680) {
      return;
    }

    const parentWidth = current.parentElement?.clientWidth;
    const imageWidth = current.naturalWidth;

    if (parentWidth && imageWidth > parentWidth) {
      current.style.width = `${parentWidth}px`;

      current.style.height = "auto";
    } else {
      current.style.width = "auto";

      current.style.height = "100%";
    }
  }, []);

  useWindowResize(resizeImage);

  return (
    <Paper
      className={classNames([css.MoviePreviewCard, className])}
      elevation={20}
    >
      <Typography variant="h5" align="center">
        {title}
      </Typography>
      <div className={css.movie}>
        <div className={css.moviePoster}>
          <Image
            src={imageUrl}
            loadHeight={450}
            loadWidth={300}
            onImageLoad={resizeImage}
            imageRef={imageRef}
          />
        </div>
        <div className={css.movieInfo}>
          <Typography variant="body2">
            <span>TMDB ID:</span> {id}
          </Typography>
          <Typography variant="body2">
            <span>Overview:</span> {overview}
          </Typography>
          <Typography variant="body2">
            <span>Release Date:</span> {releaseDate}
          </Typography>
          <Typography variant="body2">
            <span>Popularity:</span> {popularity}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default React.memo(MoviePreviewCard);
