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

import Seats from "components/SeatsPreview";
import Select from "ui/Select";
import { Option } from "ui/Select/Select.type";
import api from "utils/api";
import getFormErrors from "utils/getFormErrors";

import css from "./AddAuditoriumForm.module.scss";
import { AddAuditoriumFormProps } from "./AddAuditoriumForm.type";

type FormData = Record<string, number> & {
  name: string;
};

const AddAuditoriumForm = ({ cinemaId, onCancel }: AddAuditoriumFormProps) => {
  const [rowsAmount, setRowsAmount] = useState(1);

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
    mode: "onChange"
  });

  const seatOptions = useMemo(() => {
    const result: Option[] = [];

    for (let i = 0; i < 100; i++) {
      result.push({ value: i, label: i.toString() });
    }

    return result;
  }, []);

  const onSubmit = handleSubmit(async ({ name, ...rows }) => {
    const data = { name, cinemaId, ...rows };

    try {
      await api.post("/auditorium", data);
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

      const element = (
        <div key={letter} className={css.inputField}>
          <div>
            <Controller
              control={control}
              className={css.select}
              name={letter}
              label={`Row ${letter}`}
              as={Select}
              options={seatOptions}
              onChange={handleSelectChange}
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
      <Typography variant="h5">Add Auditorium</Typography>
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
            Add
          </Button>
        </form>
        <div className={css.preview}>
          <Seats rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddAuditoriumForm);
