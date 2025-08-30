import { useEffect } from "react";
import { MovieCard } from "./movie-card";
import { useMovieStore } from "@/store/movieStore";
import { LoadingState } from "./loading-state";
import { Link } from "react-router-dom";

export function UpcomingMoviesList() {
  const {
    upcomingMovies,
    loadingUpcoming,
    errorUpcoming,
    fetchUpcomingMovies,
  } = useMovieStore();
  useEffect(() => {
    fetchUpcomingMovies();
  }, [fetchUpcomingMovies]);

  if (loadingUpcoming) {
    <LoadingState message="Loading movies..." variant="fullPage" />;
  }

  if (errorUpcoming) {
    <p className="text-red-500">{errorUpcoming}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Movies</h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
        {upcomingMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
