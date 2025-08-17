import { create } from "zustand";
import { movieService } from "@/services/movieService";
import type { MovieItem } from "@/types/movieTypes";

interface MovieState {
  movies: MovieItem[];
  loading: boolean;
  error: string | null;

  fetchPopularMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  loading: false,
  error: null,

  fetchPopularMovies: async () => {
    set({ loading: true, error: null });

    try {
      const data = await movieService.getPopularMovies();
      set({ movies: data.results, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },
}));
