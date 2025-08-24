import { create } from "zustand";
import { movieService } from "@/services/movieService";
import type { MovieItem } from "@/types/movieTypes";

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

  fetchPopularMovies: () => Promise<void>;
  fetchUpcomingMovies: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  // Popular
  popularMovies: [],
  loadingPopular: false,
  errorPopular: null,

  // Upcoming
  upcomingMovies: [],
  loadingUpcoming: false,
  errorUpcoming: null,

  // Search
  searchResults: [],
  loadingSearch: false,
  errorSearch: null,

  // Actions
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
