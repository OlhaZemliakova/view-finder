import { WatchlistItem } from "@/components/watch-list-item";
import { Link, useNavigate } from "react-router-dom";
import { useMovieStore } from "@/store/movieStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { watchlist, fetchWatchlist } = useMovieStore();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="flex flex-col container mx-auto justify-center min-h-[calc(100vh-22rem)] text-center">
        <p className="text-gray-500 ">You don't have any saved movies yet</p>
        <Link to="/">Go back to Home Page</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your watchlist</h1>
       <div className="ml-10 mt-2">
          <Button variant="link" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>
      {watchlist.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <WatchlistItem key={movie.id} movie={movie} />
        </Link>
      ))}
    </div>
  );
}
