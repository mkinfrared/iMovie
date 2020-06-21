/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";

import { TMDB_API_KEY } from "config/secrets";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3"
  // TODO not working. Expected to be fixed in 0.22 release
  // params: {
  // api_key: TMDB_API
  // }
});

const baseParams = {
  api_key: TMDB_API_KEY,
  language: "en-US",
  include_adult: true
};

const tmdbApi = {
  get: <T = any>(url: string, params?: Record<string, any>) =>
    instance.get<T>(url, {
      params: { ...baseParams, ...params },
      timeout: 2 * 60 * 1000
    })
};

export default tmdbApi;
