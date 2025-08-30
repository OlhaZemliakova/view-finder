import { useEffect } from "react";
import { MovieCard } from "./movie-card";
import { useMovieStore } from "@/store/movieStore";
import { LoadingState } from "./loading-state";
import { Link } from "react-router-dom";

export function PopularMoviesList() {
  const { popularMovies, loadingPopular, errorPopular, fetchPopularMovies } =
    useMovieStore();
  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  if (loadingPopular) {
    <LoadingState message="Loading movies..." variant="fullPage" />;
  }

  if (errorPopular) {
    <p className="text-red-500">{errorPopular}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Popular</h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
        {popularMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
