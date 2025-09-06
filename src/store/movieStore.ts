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
  popularPage: number;
  popularTotalPages: number;
  loadingPopular: boolean;
  errorPopular: string | null;

  upcomingMovies: MovieItem[];
  upcomingPage: number;
  upcomingTotalPages: number;
  loadingUpcoming: boolean;
  errorUpcoming: string | null;

  searchResults: MovieItem[];
  searchPage: number;
  searchTotalPages: number;
  loadingSearch: boolean;
  errorSearch: string | null;

  watchlist: WatchlistMovie[];
  watchlistDocIds: Record<number, string>;

  addToWatchlist: (movie: WatchlistMovie) => Promise<void>;
  removeFromWatchlist: (id: number) => Promise<void>;
  isInWatchlist: (id: number) => boolean;
  fetchWatchlist: () => Promise<void>;

  fetchPopularMovies: (page?: number) => Promise<void>;
  fetchUpcomingMovies: (page?: number) => Promise<void>;
  searchMovies: (query: string, page?: number) => Promise<void>;

  resetStore: () => void;
}

const initialState = {
  popularMovies: [],
  popularPage: 1,
  popularTotalPages: 1,
  loadingPopular: false,
  errorPopular: null,

  upcomingMovies: [],
  upcomingPage: 1,
  upcomingTotalPages: 1,
  loadingUpcoming: false,
  errorUpcoming: null,

  searchResults: [],
  searchPage: 1,
  searchTotalPages: 1,
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

  fetchPopularMovies: async (page = 1) => {
    set({ loadingPopular: true, errorPopular: null });

    try {
      const data = await movieService.getPopularMovies(page);
      set({
        popularMovies: data.results,
        popularPage: data.page,
        loadingPopular: false,
        popularTotalPages: data.total_pages,
      });
    } catch (err) {
      set({
        errorPopular: err instanceof Error ? err.message : "Unknown error",
        loadingPopular: false,
      });
    }
  },
  fetchUpcomingMovies: async (page = 1) => {
    set({ loadingUpcoming: true, errorUpcoming: null });

    try {
      const data = await movieService.getUpcoming(page);
      set({
        upcomingMovies: data.results,
        upcomingPage: data.page,
        upcomingTotalPages: data.total_pages,
        loadingUpcoming: false,
      });
    } catch (err) {
      set({
        errorUpcoming: err instanceof Error ? err.message : "Unknown error",
        loadingUpcoming: false,
      });
    }
  },
  searchMovies: async (query: string, page = 1) => {
    if (!query.trim()) return;
    set({ loadingSearch: true, errorSearch: null, searchResults: [] });
    try {
      const data = await movieService.searchMovies(query, page);
      set({
        searchResults: data.results,
        loadingSearch: false,
        searchPage: data.page,
        searchTotalPages: data.total_pages,
      });
    } catch (err) {
      set({
        errorSearch: err instanceof Error ? err.message : "Unknown error",
        loadingSearch: false,
      });
    }
  },
  resetStore: () => {
    set(initialState);
  },
}));
