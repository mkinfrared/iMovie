import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import css from "components/AddCinemaForm/AddCinemaForm.module.scss";
import { fetchCinemas } from "store/reducers/cinemas/actions";
import { Country, Zipcode } from "store/reducers/cinemas/types";
import SearchField from "ui/SearchField";
import Transition from "ui/Transition/Transition";
import api from "utils/api";
import getFormErrors from "utils/getFormErrors";
import { addCinemaFormValidation } from "utils/validation";

import { EditCinemaFormProps } from "./EditCinemaForm.type";

type FormData = {
  cinemaName: string;
  country: Pick<Country, "alpha2Code" | "name">;
  zipcode: string;
};

const EditCinemaForm = ({
  dispatch,
  onClose,
  open,
  cinema
}: EditCinemaFormProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [zip, setZip] = useState<Zipcode | null>(null);

  const defaultValues = {
    cinemaName: cinema.name,
    country: {
      alpha2Code: cinema.zipcode.country.alpha2Code,
      name: cinema.zipcode.country.name
    },
    zipcode: cinema.zipcode.code
  };

  const {
    register,
    getValues,
    setValue,
    errors,
    triggerValidation,
    handleSubmit,
    formState,
    setError,
    watch
  } = useForm<FormData>({
    validationSchema: addCinemaFormValidation,
    mode: "onBlur",
    defaultValues
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
        id: cinema.id,
        name: values.cinemaName,
        zipcodeId: zip?.id
      };

      await api.put("/cinema", data);

      dispatch(fetchCinemas());

      onClose();
    } catch (e) {
      if (e.response?.status === 409) {
        const responseErrors = getFormErrors(e.response?.data);

        setError(responseErrors);
      }
    }
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
    if (open) {
      fetchCountries();

      fetchZipcodes(getValues("zipcode"));
    }
  }, [open]);

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
      <DialogTitle>Edit Cinema</DialogTitle>
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
            onBlur={handleCountryBlur}
            loading={countriesLoading}
            helperText={errors.country?.name?.message || null}
            error={!!errors.country?.name?.message}
            className={css.input}
            name="country"
            label="Country"
            getOptionLabel={(option) => option.name}
            getOptionSelected={getOptionSelected}
            value={getValues({ nest: true }).country as Country}
          />
          <TextField
            fullWidth
            autoComplete="new-zipcode"
            disabled={zipcodeDisabled}
            name="zipcode"
            className={css.input}
            label="Zipcode"
            variant="outlined"
            onBlur={handleZipcodeBlur}
            helperText={errors.zipcode?.message || null}
            error={!!errors.zipcode}
            inputRef={register}
            inputProps={{ "data-testid": "zipcodeInput" }}
          />
          <TextField
            fullWidth
            name="cinemaName"
            autoComplete="new-cinema"
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
          Cinema: {watch().cinemaName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          data-testid="submitButton"
          onClick={onSubmit}
          color="primary"
          disabled={formState.isSubmitting}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditCinemaForm);
