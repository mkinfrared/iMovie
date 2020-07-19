import Typography from "@material-ui/core/Typography";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";

import Option from "components/Option/Option";
import { Person } from "store/reducers/movies/types";
import MultiSearchField from "ui/MultiSearchField";
import api from "utils/api";
import classNames from "utils/classNames";
import { getTmdbImage } from "utils/tmdbApi";

import css from "./MovieFilters.module.scss";
import { MovieFiltersProps } from "./MovieFilters.type";

const MovieFilters = ({
  onCastChange,
  onDirectorChange,
  onWriterChange,
  onProducerChange,
  className
}: MovieFiltersProps) => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async (value: string) => {
    const params = {
      name: value
    };

    try {
      const response = await api.get<Person[]>("/person", { params });

      setPeople(response.data);
    } catch (e) {}
  };

  const handleInputChange = useCallback(
    debounce((_: any, value: string) => {
      fetchPeople(value);
    }, 350),
    []
  );

  const getOptionLabel = useCallback((option: Person) => option.name, []);

  const renderOptions = useCallback(({ name, profilePath }: Person) => {
    return (
      <Option
        title={name}
        imageUrl={getTmdbImage.profileSizes.w45 + profilePath}
      />
    );
  }, []);

  const getOptionsSelected = useCallback(
    (option: Person, value: Person) => option.id === value.id,
    []
  );

  return (
    <div className={classNames([css.MovieFilters, className])}>
      <Typography variant="h5">Filters</Typography>
      <MultiSearchField
        options={people}
        onChange={onCastChange}
        onInputChange={handleInputChange}
        getOptionSelected={getOptionsSelected}
        getOptionLabel={getOptionLabel}
        renderOption={renderOptions}
        filterSelectedOptions
        name="cast"
        label="Actors"
        className={css.select}
      />
      <MultiSearchField
        options={people}
        onChange={onDirectorChange}
        onInputChange={handleInputChange}
        getOptionSelected={getOptionsSelected}
        getOptionLabel={getOptionLabel}
        renderOption={renderOptions}
        filterSelectedOptions
        name="director"
        label="Directors"
        className={css.select}
      />
      <MultiSearchField
        options={people}
        onChange={onWriterChange}
        onInputChange={handleInputChange}
        getOptionSelected={getOptionsSelected}
        getOptionLabel={getOptionLabel}
        renderOption={renderOptions}
        filterSelectedOptions
        name="writers"
        label="Writers"
        className={css.select}
      />
      <MultiSearchField
        options={people}
        onChange={onProducerChange}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionsSelected}
        renderOption={renderOptions}
        filterSelectedOptions
        name="producers"
        label="Producers"
        className={css.select}
      />
    </div>
  );
};

export default React.memo(MovieFilters);
