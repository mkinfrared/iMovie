import { CastDto } from "modules/cast/dto/cast.dto";
import { CrewDto } from "modules/crew/dto/crew.dto";

class MovieDto {
  id: number;
}

class MovieDetailsResponse {
  adult: boolean;

  backdrop_path: string;

  budget: number;

  genres: Array<{ id: number; name: string }>;

  homepage: string;

  id: number;

  imdb_id: string;

  original_language: string;

  original_title: string;

  overview: string;

  popularity: number;

  poster_path: string;

  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;

  production_countries: Array<{ iso_3166_1: string; name: string }>;

  release_date: string;

  revenue: number;

  runtime: number;

  status: string;

  tagline: string;

  title: string;

  video: boolean;

  vote_average: number;

  vote_count: number;
}

class MovieCredits {
  id: number;

  cast: CastDto[];

  crew: CrewDto[];
}

export { MovieDto, MovieCredits, MovieDetailsResponse };
