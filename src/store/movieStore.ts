import { create } from "zustand";
import { movieService } from "@/services/movieService";
import type { MovieItem, WatchlistMovie } from "@/types/movieTypes";
import { database, auth } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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
  watchlistDocIds: Record<number, string>;

  addToWatchlist: (movie: WatchlistMovie) => Promise<void>;
  removeFromWatchlist: (id: number) => Promise<void>;
  isInWatchlist: (id: number) => boolean;
  fetchWatchlist: () => Promise<void>;

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
  watchlistDocIds: {},
};

export const useMovieStore = create<MovieState>((set, get) => ({
  ...initialState,

  addToWatchlist: async (movie) => {
    const { watchlist, watchlistDocIds } = get();
    if (watchlist.find((m) => m.id === movie.id)) return;

    const user = auth.currentUser;
    if (!user) return;

    const watchlistCollection = await addDoc(
      collection(database, "watchlist"),
      {
        ...movie,
        userId: user.uid,
      }
    );

    set({
      watchlist: [...watchlist, movie],
      watchlistDocIds: {
        ...watchlistDocIds,
        [movie.id]: watchlistCollection.id,
      },
    });
  },
  removeFromWatchlist: async (id) => {
    const { watchlist, watchlistDocIds } = get();
    const docId = watchlistDocIds[id];
    if (docId) {
      await deleteDoc(doc(database, "watchlist", docId));
    }
    const updatedIds = { ...watchlistDocIds };
    delete updatedIds[id];
    set({
      watchlist: watchlist.filter((m) => m.id !== id),
      watchlistDocIds: updatedIds,
    });
  },
  isInWatchlist: (id) => {
    return get().watchlist.some((m) => m.id === id);
  },
  fetchWatchlist: async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(database, "watchlist"),
      where("userId", "==", user.uid)
    );
    const snapshot = await getDocs(q);
    const movies: WatchlistMovie[] = [];
    const ids: Record<number, string> = {};

    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as WatchlistMovie;
      movies.push(data);
      ids[data.id] = docSnap.id;
    });

    set({ watchlist: movies, watchlistDocIds: ids });
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
