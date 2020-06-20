import { addAuditoriumValidation } from "@imovie/common";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import omit from "lodash/omit";
import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import css from "components/AddAuditoriumForm/AddAuditoriumForm.module.scss";
import Seats from "components/SeatsPreview";
import Select from "ui/Select";
import { Option } from "ui/Select/Select.type";
import api from "utils/api";
import getFormErrors from "utils/getFormErrors";
import getSeatRowsLength from "utils/getSeatRowsLength";

import { EditAuditoriumFormProps } from "./EditAuditoriumForm.type";

type FormData = Record<string, number> & {
  name: string;
};

const EditAuditoriumForm = ({
  auditorium,
  onCancel
}: EditAuditoriumFormProps) => {
  const seats = getSeatRowsLength(auditorium.seats);
  const [rowsAmount, setRowsAmount] = useState(Object.keys(seats).length);

  // eslint-disable-next-line prefer-object-spread
  const defaultValues: FormData = Object.assign({
    name: auditorium.name,
    ...seats
  });

  const {
    control,
    handleSubmit,
    register,
    errors,
    getValues,
    triggerValidation,
    setError,
    formState
  } = useForm<FormData>({
    validationSchema: addAuditoriumValidation,
    mode: "onChange",
    defaultValues
  });

  const seatOptions = useMemo(() => {
    const result: Option[] = [];

    for (let i = 0; i < 100; i++) {
      result.push({ value: i, label: i.toString() });
    }

    return result;
  }, []);

  const onSubmit = handleSubmit(async ({ name, ...rows }) => {
    const { id } = auditorium;
    const data = { name, id, ...rows };

    try {
      await api.put("/auditorium", data);

      onCancel();
    } catch (e) {
      if (e.response?.status === 409) {
        const responseErrors = getFormErrors(e.response?.data);

        setError(responseErrors);
      }
    }
  });

  const handleSelectChange = ([event]: any[]) => {
    triggerValidation();

    return event.target.value;
  };

  const handleAddRowClick = useCallback(
    (rowName: string) => async () => {
      const zCode = "Z".charCodeAt(0);
      const currentRowCode = rowName.charCodeAt(0);
      const addRowCode = currentRowCode + 1;

      if (addRowCode > zCode) {
        return;
      }

      const valid = await triggerValidation();

      if (valid) {
        setRowsAmount((prevState) => prevState + 1);
      }
    },
    [triggerValidation]
  );

  const handleRemoveRowClick = useCallback(
    (rowName: string) => () => {
      const aCode = "A".charCodeAt(0);
      const removeRowCode = rowName.charCodeAt(0);

      if (removeRowCode <= aCode) {
        return;
      }

      triggerValidation();

      setRowsAmount((prevState) => prevState - 1);
    },
    [triggerValidation]
  );

  const renderSelects = () => {
    const selects: React.ReactElement[] = [];

    for (let i = 0; i < rowsAmount; i++) {
      const aCode = "A".charCodeAt(0);
      const letter = String.fromCharCode(aCode + i);
      const defaultValue = defaultValues[letter];

      const select = (
        <Select
          defaultValue={defaultValue}
          onChange={handleSelectChange as any}
          className={css.select}
          label={`Row ${letter}`}
          options={seatOptions}
        />
      );

      const element = (
        <div key={letter} className={css.inputField}>
          <div>
            <Controller
              control={control}
              name={letter}
              as={select}
              error={!!errors[letter]}
              helperText={errors[letter]?.message}
            />
          </div>
          <IconButton
            className={css.addRemoveButton}
            onClick={handleAddRowClick(letter)}
            color="primary"
            data-testid="addRowButton"
          >
            <AddIcon />
          </IconButton>
          <IconButton
            className={css.addRemoveButton}
            onClick={handleRemoveRowClick(letter)}
            color="primary"
            data-testid="removeRowButton"
          >
            <ClearIcon />
          </IconButton>
        </div>
      );

      selects.push(element);
    }

    return selects;
  };

  const rows = omit(getValues(), "name");

  return (
    <div className={css.AddAuditoriumForm}>
      <Typography variant="h5">Edit Auditorium</Typography>
      <div className={css.container}>
        <form onSubmit={onSubmit} className={css.form} data-testid="form">
          <TextField
            fullWidth
            name="name"
            className={css.input}
            label="Auditorium Name"
            variant="outlined"
            helperText={errors.name?.message || null}
            error={!!errors.name}
            inputRef={register}
            inputProps={{ "data-testid": "auditoriumName" }}
          />
          <div>{renderSelects()}</div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            data-testid="submitButton"
            onClick={onSubmit}
            color="primary"
            disabled={formState.isSubmitting}
          >
            Save
          </Button>
        </form>
        <div className={css.preview}>
          <Seats rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditAuditoriumForm);
