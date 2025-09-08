const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

async function tmdbFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  if (!response.ok) {
    throw new Error(
      `TMDB API error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export const movieService = {
  getPopularMovies: (page = 1) => tmdbFetch(`/movie/popular?page=${page}`),
  getUpcoming: (page = 1) => tmdbFetch(`/movie/upcoming?page=${page}`),
  searchMovies: (query: string, page = 1) =>
    tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),
  getMovieDetails: (id: number) => tmdbFetch(`/movie/${id}`),
  getNowPlaying: (page = 1) => tmdbFetch(`/movie/now_playing?page=${page}`),
  getTopRated: (page = 1) => tmdbFetch(`/movie/top_rated?page=${page}`),
  getMovieVideos: (id: number) => tmdbFetch(`/movie/${id}/videos`),
};
