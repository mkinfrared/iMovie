import { Movie } from "store/reducers/movies/types";

export type MovieResponse = {
  page: number;
  total: number;
  result: Movie[];
};
