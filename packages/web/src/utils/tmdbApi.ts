/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";

import { TMDB_API } from "utils/secrets";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3"
  // TODO not working. Expected to be fixed in 0.22 release
  // params: {
  // api_key: TMDB_API
  // }
});

const baseParams = {
  api_key: TMDB_API,
  language: "en-US",
  include_adult: true
};

const tmdbApi = {
  get: <T = any>(url: string, params?: Record<string, any>) =>
    instance.get<T>(url, { params: { ...baseParams, ...params } })
};

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const getUrl = (size: string) => imageBaseUrl + size;

const getTmdbImage = {
  backdropSizes: {
    w300: getUrl("w300"),
    w780: getUrl("w780"),
    w1200: getUrl("w1280"),
    priginal: getUrl("original")
  },
  logoSizes: {
    w45: getUrl("w45"),
    w92: getUrl("w92"),
    w154: getUrl("w154"),
    w185: getUrl("w185"),
    w300: getUrl("w300"),
    w500: getUrl("w500"),
    original: getUrl("original")
  },
  posterSizes: {
    w92: getUrl("w92"),
    w154: getUrl("w154"),
    w185: getUrl("w185"),
    w342: getUrl("w342"),
    w500: getUrl("w500"),
    w780: getUrl("w780"),
    original: getUrl("original")
  },
  profileSizes: {
    w45: getUrl("w45"),
    w185: getUrl("w185"),
    h632: getUrl("h632"),
    original: getUrl("original")
  },
  stillSizes: {
    w92: getUrl("w92"),
    w185: getUrl("w185"),
    w300: getUrl("w300"),
    original: getUrl("original")
  }
};

export { getTmdbImage };

export default tmdbApi;
