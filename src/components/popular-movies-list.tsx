import { useEffect } from "react";
import { MovieCard } from "./movie-card";
import { useMovieStore } from "@/store/movieStore";
import { LoadingState } from "./loading-state";

export function PopularMoviesList() {
  const {
    movies,
    loading,
    // error,
    fetchPopularMovies,
  } = useMovieStore();
  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  if (loading) {
    <LoadingState message="Loading movies..." variant="fullPage" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Popular</h2>
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
