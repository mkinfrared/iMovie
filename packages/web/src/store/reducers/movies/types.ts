export enum Gender {
  female,
  male
}

export interface Person {
  id: number;
  birthday: string | null;
  deathday: string | null;
  name: string;
  gender: Gender;
  biography: string;
  popularity: number;
  placeOfBirth: string | null;
  profilePath: string | null;
  adult: boolean;
  imdbId: string;
  homepage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  adult: boolean;
  backdropPath: string;
  budget: number;
  domesticGross: number;
  homepage: string;
  id: number;
  imdbId: string;
  internationalGross: number;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  runtime: number;
  tagline: string;
  title: string;
  worldwideGross: number;
}
