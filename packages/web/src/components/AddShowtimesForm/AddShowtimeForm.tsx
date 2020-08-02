/* eslint-disable no-shadow */
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Option from "components/Option/Option";
import {
  Auditorium,
  Cinema,
  City,
  Country,
  State,
  Zipcode
} from "store/reducers/cinemas/types";
import { Movie } from "store/reducers/movies/types";
import DateTimePicker from "ui/DateTimePicker";
import { DateType } from "ui/DateTimePicker/DateTimePicker.type";
import SearchField from "ui/SearchField";
import Transition from "ui/Transition/Transition";
import api from "utils/api";
import { getTmdbImage } from "utils/tmdbApi";
import { addShowtimeValidation } from "utils/validation";

import css from "./AddShowtimeForm.module.scss";
import { AddShowtimeFormProps } from "./AddShowtimeForm.type";

type FormValues = {
  country?: Country;
  state?: State;
  city?: City;
  zipcode?: Zipcode;
  cinema?: Cinema;
  auditorium?: Auditorium;
  movie?: Movie;
  date?: DateType;
};

const AddShowtimeForm = ({
  onClose,
  open,
  cinema,
  auditorium
}: AddShowtimeFormProps) => {
  const defaultValues = {
    country: cinema?.zipcode.country,
    state: cinema?.zipcode.state,
    city: cinema?.zipcode.city,
    zipcode: cinema?.zipcode,
    cinema,
    auditorium,
    movie: undefined,
    date: null
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    formState,
    watch
  } = useForm<FormValues>({
    defaultValues,
    validationSchema: addShowtimeValidation
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [states, setStates] = useState<State[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [zipcodes, setZipcodes] = useState<Zipcode[]>([]);
  const [zipcodesLoading, setZipcodesLoading] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [cinemasLoading, setCinemasLoading] = useState(false);
  const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
  const [auditoriumsLoading, setAuditoriumsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(false);

  const onSubmit = handleSubmit(async ({ auditorium, movie, date }) => {
    try {
      const data = {
        movieId: movie?.id,
        auditoriumId: auditorium?.id,
        startDate: date?.toISOString()
      };

      await api.post("/showtime", data);

      onClose();
    } catch (e) {}
  });

  const fetchCountries = async () => {
    try {
      setCountriesLoading(true);

      const response = await api.get("/country");

      setCountries(response.data.result);
    } catch (e) {
    } finally {
      setCountriesLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      setStatesLoading(true);

      const { country } = getValues();

      const params = {
        countryId: country?.alpha2Code
      };

      const response = await api.get("/state", { params });

      setStates(response.data);
    } catch (e) {
    } finally {
      setStatesLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      setCitiesLoading(true);

      const { state } = getValues();

      const params = {
        stateId: state?.id
      };

      const response = await api.get("/city", { params });

      setCities(response.data);
    } catch (e) {
    } finally {
      setCitiesLoading(false);
    }
  };

  const fetchZipcodes = async () => {
    try {
      setZipcodesLoading(true);

      const { city } = getValues();
      const response = await api.get(`/zipcode/city/${city?.id}`);

      setZipcodes(response.data);
    } catch (e) {
    } finally {
      setZipcodesLoading(false);
    }
  };

  const fetchCinemas = async () => {
    try {
      setCinemasLoading(true);

      const { zipcode } = getValues();

      const params = {
        zipcodeId: zipcode?.id
      };

      const response = await api.get("/cinema", { params });

      setCinemas(response.data.result);
    } catch (e) {
    } finally {
      setCinemasLoading(false);
    }
  };

  const fetchAuditoriums = async () => {
    try {
      setAuditoriumsLoading(true);

      const { cinema } = getValues();

      const params = {
        cinemaId: cinema?.id
      };

      const response = await api.get("/auditorium", { params });

      setAuditoriums(response.data);
    } catch (e) {
    } finally {
      setAuditoriumsLoading(false);
    }
  };

  const fetchMovies = useCallback(async (value: string) => {
    try {
      setMoviesLoading(true);

      const params = { title: value };
      const response = await api.get("/movie", { params });

      setMovies(response.data.result);
    } catch (e) {
    } finally {
      setMoviesLoading(false);
    }
  }, []);

  const handleCountryChange = useCallback(
    (_: any, country: Country | null) => {
      if (country) {
        setValue("country", country);

        setValue("state", undefined);

        setValue("city", undefined);

        setValue("zipcode", undefined);

        setValue("cinema", undefined);

        setValue("auditorium", undefined);
      }
    },
    [setValue]
  );

  const handleStateChange = useCallback(
    (_: any, state: State | null) => {
      if (state) {
        setValue("state", state);

        setValue("city", undefined);

        setValue("zipcode", undefined);

        setValue("cinema", undefined);

        setValue("auditorium", undefined);
      }
    },
    [setValue]
  );

  const handleCityChange = useCallback(
    (_: any, city: City | null) => {
      if (city) {
        setValue("city", city);

        setValue("zipcode", undefined);

        setValue("cinema", undefined);

        setValue("auditorium", undefined);
      }
    },
    [setValue]
  );

  const handleZipcodeChange = useCallback(
    (_: any, zipcode: Zipcode | null) => {
      if (zipcode) {
        setValue("zipcode", zipcode);

        setValue("cinema", undefined);

        setValue("auditorium", undefined);
      }
    },
    [setValue]
  );

  const handleCinemaChange = useCallback(
    (_: any, cinema: Cinema | null) => {
      if (cinema) {
        setValue("cinema", cinema);

        setValue("auditorium", undefined);
      }
    },
    [setValue]
  );

  const handleAuditoriumChange = useCallback(
    (_: any, auditorium: Auditorium | null) => {
      if (auditorium) {
        setValue("auditorium", auditorium);
      }
    },
    [setValue]
  );

  const handleMovieInputChange = useCallback(
    debounce((_: any, value: string) => {
      fetchMovies(value);
    }, 350),
    []
  );

  const handleMovieChange = useCallback(
    (_: any, movie: Movie | null) => {
      if (movie) {
        setValue("movie", movie);
      }
    },
    [setValue]
  );

  const renderMovieOptions = useCallback(({ title, posterPath }: Movie) => {
    return (
      <Option
        title={title}
        imageUrl={getTmdbImage.posterSizes.w92 + posterPath}
      />
    );
  }, []);

  const handleDateChange = useCallback(
    (date: DateType) => {
      setValue("date", date);
    },
    [setValue]
  );

  const getCountrySelected = useCallback(
    (option, value) => option.alpha2Code === value.alpha2Code,
    []
  );

  const getOptionLabel = useCallback((option) => option.name, []);
  const getZipcodeLabel = useCallback((option) => option.code, []);
  const getMovieLabel = useCallback((option) => option.title, []);

  const getOptionSelected = useCallback(
    (option, value) => option.id === value.id,
    []
  );

  useEffect(() => {
    register({ name: "country" });

    register({ name: "state" });

    register({ name: "city" });

    register({ name: "zipcode" });

    register({ name: "cinema" });

    register({ name: "auditorium" });

    register({ name: "movie" });

    register({ name: "date" });
  }, [register]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const {
    country: countryValue,
    state: stateValue,
    city: cityValue,
    zipcode: zipcodeValue,
    cinema: cinemaValue,
    date: dateValue
  } = watch();

  useEffect(() => {
    if (countryValue) {
      fetchStates();
    }
  }, [countryValue]);

  useEffect(() => {
    if (stateValue) {
      fetchCities();
    }
  }, [stateValue]);

  useEffect(() => {
    if (cityValue) {
      fetchZipcodes();
    }
  }, [cityValue]);

  useEffect(() => {
    if (zipcodeValue) {
      fetchCinemas();
    }
  }, [zipcodeValue]);

  useEffect(() => {
    if (cinemaValue) {
      fetchAuditoriums();
    }
  }, [cinemaValue]);

  return (
    <Dialog
      open={open}
      className={css.AddShowtimeForm}
      TransitionComponent={Transition}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>Add Showtime</DialogTitle>
      <DialogContent>
        <form
          onSubmit={onSubmit}
          className={css.form}
          data-testid="form"
          noValidate
        >
          <SearchField
            options={countries}
            onChange={handleCountryChange}
            loading={countriesLoading}
            helperText={errors.country?.message || null}
            error={!!errors.country?.message}
            className={css.input}
            name="country"
            label="Country"
            getOptionLabel={getOptionLabel}
            getOptionSelected={getCountrySelected}
          />
          <SearchField
            key={`${countryValue?.alpha2Code}${countryValue?.name}1`}
            options={states}
            onChange={handleStateChange}
            loading={statesLoading}
            helperText={errors.state?.message || null}
            error={!!errors.state?.message}
            className={css.input}
            name="state"
            label="State"
            getOptionLabel={getOptionLabel}
            getOptionSelected={getOptionSelected}
          />
          <SearchField
            key={`${stateValue?.id}${stateValue?.name}2`}
            options={cities}
            onChange={handleCityChange}
            loading={citiesLoading}
            helperText={errors.city?.message || null}
            error={!!errors.city?.message}
            className={css.input}
            name="city"
            label="City"
            getOptionLabel={getOptionLabel}
            getOptionSelected={getOptionSelected}
          />
          <SearchField
            key={`${cityValue?.id}${cityValue?.name}3`}
            options={zipcodes}
            onChange={handleZipcodeChange}
            loading={zipcodesLoading}
            helperText={errors.zipcode?.message || null}
            error={!!errors.zipcode?.message}
            className={css.input}
            name="zipcode"
            label="Zipcode"
            getOptionLabel={getZipcodeLabel}
            getOptionSelected={getOptionSelected}
          />
          <SearchField
            key={`${zipcodeValue?.id}${zipcodeValue?.code}4`}
            options={cinemas}
            onChange={handleCinemaChange}
            loading={cinemasLoading}
            helperText={errors.cinema?.message || null}
            error={!!errors.cinema?.message}
            className={css.input}
            name="cinema"
            label="Cinema"
            getOptionLabel={getOptionLabel}
            getOptionSelected={getOptionSelected}
          />
          <SearchField
            key={`${cinemaValue?.id}${cinemaValue?.name}5`}
            options={auditoriums}
            onChange={handleAuditoriumChange}
            loading={auditoriumsLoading}
            helperText={errors.auditorium?.message || null}
            error={!!errors.auditorium?.message}
            className={css.input}
            name="auditorium"
            label="Auditorium"
            getOptionLabel={getOptionLabel}
            getOptionSelected={getOptionSelected}
          />
          <SearchField
            options={movies}
            onChange={handleMovieChange}
            onInputChange={handleMovieInputChange}
            renderOption={renderMovieOptions}
            loading={moviesLoading}
            helperText={errors.movie?.message || null}
            error={!!errors.movie?.message}
            className={css.input}
            name="movie"
            label="Movie"
            getOptionLabel={getMovieLabel}
            getOptionSelected={getOptionSelected}
          />
          <DateTimePicker
            label="Date"
            name="date"
            value={dateValue}
            onChange={handleDateChange}
            helperText={errors.date?.message || null}
            error={!!errors.date?.message}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          data-testid="submitButton"
          onClick={onSubmit}
          color="primary"
          disabled={formState.isSubmitting}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(AddShowtimeForm);
