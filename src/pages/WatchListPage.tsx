import { MovieCardHorizontal } from "@/components/movie-card-horizontal";
import { Link } from "react-router-dom";
import { useMovieStore } from "@/store/movieStore";

export default function WatchlistPage() {
  const { watchlist } = useMovieStore();

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="flex flex-col container mx-auto justify-center min-h-[calc(100vh-22rem)] text-center">
        <p className="text-gray-500 ">You don't have any saved movies yet</p>
        <Link to="/">Go back to Home Page</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-4 container mx-auto">
      {watchlist.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <MovieCardHorizontal key={movie.id} movie={movie} />
        </Link>
      ))}
    </div>
  );
}
