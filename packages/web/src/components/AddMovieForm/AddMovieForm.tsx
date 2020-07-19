/* eslint-disable @typescript-eslint/camelcase */
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import debounce from "lodash/debounce";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import MoviePreviewCard from "components/MoviePreviewCard";
import Option from "components/Option";
import NotificationAction from "ui/NotificationAction";
import SearchField from "ui/SearchField";
import api from "utils/api";
import tmdbApi, { getTmdbImage } from "utils/tmdbApi";

import css from "./AdminMovieForm.module.scss";
import { AddMovieFormProps, SearchResult } from "./AdminMovieForm.type";

const AddMovieForm = ({ onCancel }: AddMovieFormProps) => {
  const [movies, setMovies] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<SearchResult | null>(null);
  const { handleSubmit, formState } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const fetchMovies = async (value: string) => {
    try {
      setLoading(true);

      const params = {
        query: value
      };

      const response = await tmdbApi.get("/search/movie", params);

      setMovies(response.data.results);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback(
    debounce((_: any, value: string) => {
      fetchMovies(value);
    }, 350),
    []
  );

  const renderOptions = useCallback(({ title, poster_path }: SearchResult) => {
    return (
      <Option
        title={title}
        imageUrl={getTmdbImage.posterSizes.w92 + poster_path}
      />
    );
  }, []);

  const getOptionLabel = useCallback(
    (option: SearchResult) => option.title,
    []
  );

  const handleChange = useCallback((_: any, value: SearchResult | null) => {
    setSelectedMovie(value);
  }, []);

  const onSubmit = handleSubmit(async () => {
    try {
      const id = selectedMovie?.id;

      await api.post("/movie", { id });

      enqueueSnackbar("Movie added", { variant: "success" });

      onCancel();
    } catch (e) {
      enqueueSnackbar(e.response.data.message, {
        variant: "error",
        action: NotificationAction
      });
    }
  });

  return (
    <div className={css.AdminMovieForm}>
      <Typography variant="h5">Add Movie</Typography>
      <form className={css.form} onSubmit={onSubmit}>
        <SearchField
          options={movies}
          onChange={handleChange}
          onInputChange={handleInputChange}
          loading={loading}
          getOptionLabel={getOptionLabel}
          renderOption={renderOptions}
          name="movie"
          label="Movie"
        />
        {selectedMovie && (
          <MoviePreviewCard
            key={selectedMovie.id}
            id={selectedMovie.id}
            className={css.movieCard}
            title={selectedMovie.title}
            imageUrl={getTmdbImage.posterSizes.w342 + selectedMovie.poster_path}
            overview={selectedMovie.overview}
            popularity={selectedMovie.popularity}
            releaseDate={selectedMovie.release_date}
          />
        )}
        <div className={css.buttonBase}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            color="primary"
            disabled={!selectedMovie || formState.isSubmitting}
            type="submit"
            data-testid="submitButton"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(AddMovieForm);
