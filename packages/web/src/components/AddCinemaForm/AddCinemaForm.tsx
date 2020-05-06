import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { fetchCinemas } from "store/reducers/cinemas/actions";
import { Country, Zipcode } from "store/reducers/cinemas/types";
import SearchField from "ui/SearchField";
import Transition from "ui/Transition/Transition";
import api from "utils/api";
import { addCinemaFormValidation } from "utils/validation";

import css from "./AddCinemaForm.module.scss";
import { AddCinemaFormProps } from "./AddCinemaForm.type";

type FormData = {
  cinemaName: string;
  country: Pick<Country, "alpha2Code" | "name">;
  zipcode: string;
};

const AddCinemaForm = ({ open, onClose, dispatch }: AddCinemaFormProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [zip, setZip] = useState<Zipcode | null>(null);

  const {
    register,
    getValues,
    setValue,
    errors,
    triggerValidation,
    handleSubmit,
    formState
  } = useForm<FormData>({
    validationSchema: addCinemaFormValidation,
    mode: "onBlur"
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

  const fetchZipcodes = useCallback(
    async (zipcodeValue: string) => {
      const { country } = getValues({ nest: true });
      const { alpha2Code } = country;

      try {
        const response = await api.get(
          `/zipcode/${alpha2Code}/${zipcodeValue}`
        );

        setZip(response.data);
      } catch (e) {}
    },
    [getValues]
  );

  const handleZipcodeBlur = useCallback(() => {
    const { zipcode } = getValues({ nest: true });

    fetchZipcodes(zipcode);
  }, [fetchZipcodes, getValues]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = {
        name: values.cinemaName,
        zipcodeId: zip?.id
      };

      await api.post("/cinema", data);

      dispatch(fetchCinemas());

      onClose();
    } catch (e) {}
  });

  const handleCountryChange = useCallback(
    (_: any, country: Country | null) => {
      if (country) {
        setValue("country", country);
      }
    },
    [setValue]
  );

  const handleCountryBlur = useCallback(() => {
    triggerValidation();
  }, [triggerValidation]);

  const getOptionSelected = useCallback(
    (option, value) => option.alpha2Code === value.alpha2Code,
    []
  );

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    register({ name: "country" });

    register({ name: "zipcode" });
  }, [register]);

  const zipcodeDisabled = !getValues({ nest: true }).country?.alpha2Code;

  return (
    <Dialog
      open={open}
      className={css.AddCinemaForm}
      TransitionComponent={Transition}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>Add Cinema</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className={css.form} data-testid="form">
          <SearchField
            options={countries}
            onChange={handleCountryChange}
            onBlur={handleCountryBlur}
            loading={countriesLoading}
            helperText={errors.country?.name?.message || null}
            error={!!errors.country?.name?.message}
            className={css.input}
            name="country"
            label="Country"
            getOptionLabel={(option) => option.name}
            getOptionSelected={getOptionSelected}
          />
          <TextField
            fullWidth
            disabled={zipcodeDisabled}
            name="zipcode"
            className={css.input}
            label="Zipcode"
            variant="outlined"
            onBlur={handleZipcodeBlur}
            helperText={errors.zipcode?.message || null}
            error={!!errors.zipcode}
            inputRef={register}
            inputProps={{ "data-testid": "zipcode" }}
          />
          <TextField
            fullWidth
            name="cinemaName"
            className={css.input}
            label="Cinema Name"
            variant="outlined"
            helperText={errors.cinemaName?.message || null}
            error={!!errors.cinemaName}
            inputRef={register}
            inputProps={{ "data-testid": "cinemaName" }}
          />
        </form>
      </DialogContent>
      <DialogContent>
        <DialogContentText variant="body1">
          Country: {getValues({ nest: true }).country?.name}
        </DialogContentText>
        <DialogContentText variant="body1">
          State: {zip?.state.name}
        </DialogContentText>
        <DialogContentText variant="body1">
          City: {zip?.city.name}
        </DialogContentText>
        <DialogContentText variant="body1">
          Cinema: {getValues().cinemaName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          data-testid="loginButton"
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

export default React.memo(AddCinemaForm);
