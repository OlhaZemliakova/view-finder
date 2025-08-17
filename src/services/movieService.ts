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
  getPopularMovies: () => tmdbFetch("/movie/popular"),
  searchMovies: (query: string) =>
    tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`),
  getMovieDetails: (id: number) => tmdbFetch(`/movie/${id}`),
  getNowPlaying: () => tmdbFetch("/movie/now_playing"),
  getTopRated: () => tmdbFetch("/movie/top_rated"),
  getUpcoming: () => tmdbFetch("/movie/upcoming"),
};
