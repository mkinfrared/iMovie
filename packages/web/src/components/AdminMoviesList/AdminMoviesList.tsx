import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { MovieResponse } from "components/AdminMoviesList/AdminMoviesList.type";
import MovieFilters from "components/MovieFilters";
import { Person } from "store/reducers/movies/types";
import PageLoading from "ui/PageLoading";
import api from "utils/api";

import css from "./AdminMoviesList.module.scss";

const AdminMoviesList = () => {
  const [movieData, setMovieData] = useState<MovieResponse | null>(null);
  const [selectedCast, setSelectedCast] = useState<Person[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDirectors, setSelectedDirectors] = useState<Person[] | null>(
    null
  );

  const [selectedWriters, setSelectedWriters] = useState<Person[] | null>(null);

  const [selectedProducers, setSelectedProducers] = useState<Person[] | null>(
    null
  );

  const handleCastChange = useCallback((_: any, value: Person[] | null) => {
    setSelectedCast(value);
  }, []);

  const handleDirectorsChange = useCallback(
    (_: any, value: Person[] | null) => {
      setSelectedDirectors(value);
    },
    []
  );

  const handleWritersChange = useCallback((_: any, value: Person[] | null) => {
    setSelectedWriters(value);
  }, []);

  const handleProducersChange = useCallback(
    (_: any, value: Person[] | null) => {
      setSelectedProducers(value);
    },
    []
  );

  const fetchMovies = useCallback(async () => {
    const params = {
      cast: selectedCast?.map(({ id }) => id).toString(),
      directors: selectedDirectors?.map(({ id }) => id).toString(),
      writers: selectedWriters?.map(({ id }) => id).toString(),
      producers: selectedProducers?.map(({ id }) => id).toString(),
      page: currentPage
    };

    try {
      setIsLoading(true);

      const response = await api.get<MovieResponse>("/movie", { params });

      setMovieData(response.data);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedCast,
    selectedDirectors,
    selectedProducers,
    selectedWriters,
    currentPage
  ]);

  const handlePageChange = useCallback(
    (_, page) => setCurrentPage(page + 1),
    []
  );

  useEffect(() => {
    fetchMovies();
  }, [
    selectedCast,
    selectedDirectors,
    selectedProducers,
    selectedWriters,
    currentPage
  ]);

  const tableData = useMemo(
    () =>
      movieData?.result.map(({ id, title, runtime, releaseDate }) => (
        <TableRow key={id}>
          <TableCell>{id}</TableCell>
          <TableCell>{title}</TableCell>
          <TableCell>{runtime} min</TableCell>
          <TableCell>{dayjs(releaseDate).format("MM/DD/YYYY")}</TableCell>
        </TableRow>
      )),
    [movieData]
  );

  const loading = (
    <TableRow>
      <TableCell colSpan={4}>
        <PageLoading />
      </TableCell>
    </TableRow>
  );

  return (
    <div className={css.AdminMoviesList}>
      <MovieFilters
        className={css.movieFilters}
        onCastChange={handleCastChange}
        onDirectorChange={handleDirectorsChange}
        onWriterChange={handleWritersChange}
        onProducerChange={handleProducersChange}
      />
      <div className={css.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Runtime</TableCell>
              <TableCell>Release Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{isLoading ? loading : tableData}</TableBody>
        </Table>
        <TablePagination
          component="div"
          count={movieData?.total || -1}
          rowsPerPage={10}
          page={currentPage - 1}
          onChangePage={handlePageChange}
          rowsPerPageOptions={[{ value: 1, label: "10" }]}
        />
      </div>
    </div>
  );
};

export default React.memo(AdminMoviesList);
