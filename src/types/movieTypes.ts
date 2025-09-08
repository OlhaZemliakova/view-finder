export interface GetMoviesResponce {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type GenreItem = {
  id: number;
  name: string;
};

export type ProductionCompanieItem = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountryItem = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguageItem = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export interface MovieDetailsItem {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: GenreItem[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanieItem[];
  production_countries: ProductionCountryItem[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageItem[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type WatchlistMovie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export interface Video {
  id: string;
  key: string;
  name: string;
  site: "YouTube" | "Vimeo";
  type: "Trailer" | "Teaser" | "Clip" | "Featurette";
}
