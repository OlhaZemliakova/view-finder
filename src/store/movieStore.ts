import { create } from "zustand";
import { movieService } from "@/services/movieService";
import type { MovieItem, WatchlistMovie } from "@/types/movieTypes";

interface MovieState {
  popularMovies: MovieItem[];
  loadingPopular: boolean;
  errorPopular: string | null;

  upcomingMovies: MovieItem[];
  loadingUpcoming: boolean;
  errorUpcoming: string | null;

  searchResults: MovieItem[];
  loadingSearch: boolean;
  errorSearch: string | null;

  watchlist: WatchlistMovie[];

  addToWatchlist: (movie: WatchlistMovie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;

  fetchPopularMovies: () => Promise<void>;
  fetchUpcomingMovies: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
}

const initialState = {
  popularMovies: [],
  loadingPopular: false,
  errorPopular: null,

  upcomingMovies: [],
  loadingUpcoming: false,
  errorUpcoming: null,

  searchResults: [],
  loadingSearch: false,
  errorSearch: null,

  watchlist: [],
};

export const useMovieStore = create<MovieState>((set, get) => ({
  ...initialState,

  addToWatchlist: (movie) => {
    const { watchlist } = get();
    if (!watchlist.find((m) => m.id === movie.id)) {
      set({ watchlist: [...watchlist, movie] });
    }
  },
  removeFromWatchlist: (id) => {
    const { watchlist } = get();
    set({ watchlist: watchlist.filter((m) => m.id !== id) });
  },
  isInWatchlist: (id) => {
    return get().watchlist.some((m) => m.id === id);
  },
  fetchPopularMovies: async () => {
    set({ loadingPopular: true, errorPopular: null });

    try {
      const data = await movieService.getPopularMovies();
      set({ popularMovies: data.results, loadingPopular: false });
    } catch (err) {
      set({
        errorPopular: err instanceof Error ? err.message : "Unknown error",
        loadingPopular: false,
      });
    }
  },
  fetchUpcomingMovies: async () => {
    set({ loadingUpcoming: true, errorUpcoming: null });

    try {
      const data = await movieService.getUpcoming();
      set({ upcomingMovies: data.results, loadingUpcoming: false });
    } catch (err) {
      set({
        errorUpcoming: err instanceof Error ? err.message : "Unknown error",
        loadingUpcoming: false,
      });
    }
  },
  searchMovies: async (query: string) => {
    if (!query.trim()) return;
    set({ loadingSearch: true, errorSearch: null, searchResults: [] });
    try {
      const data = await movieService.searchMovies(query);
      set({ searchResults: data.results, loadingSearch: false });
    } catch (err) {
      set({
        errorSearch: err instanceof Error ? err.message : "Unknown error",
        loadingSearch: false,
      });
    }
  },
}));
