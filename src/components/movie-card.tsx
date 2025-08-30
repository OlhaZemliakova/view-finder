import type { MovieItem } from "@/types/movieTypes";
import { Card } from "./ui/card";
import { Star } from "lucide-react";
import { formatDate } from "@/helpers/formatDate";
import { useMovieStore } from "@/store/movieStore";

type MovieCardProps = {
  movie: MovieItem;
};

export function MovieCard({ movie }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useMovieStore();
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  function handleToggleWatchlist() {
    if (!movie) return;
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }
  return (
    <Card className="w-[150px] h-[300px] flex flex-col overflow-hidden p-0 shrink-0">
      <div className="h-2/3 relative">
        <img
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
          className="w-full h-full object-fill"
        />

        <Star
          onClick={(e) => {
            e.preventDefault();
            handleToggleWatchlist();
          }}
          className={`w-6 h-6 absolute top-1 right-1 rounded-full cursor-pointer p-1 transition ${
            inWatchlist
              ? "bg-yellow-400 text-white"
              : "bg-slate-700 text-yellow-300 hover:text-red-500"
          }`}
        />
      </div>

      <div className="h-1/3 p-2 flex flex-col justify-between">
        <h2 className="font-semibold text-sm line-clamp-1">{movie.title}</h2>
        <p className="text-xs text-muted-foreground">
          Original language: {movie.original_language}
        </p>
        <div className="flex justify-between items-center">
          <p className="w-6 h-6 flex items-center justify-center rounded-full bg-stone-700 text-yellow-300 text-xs">
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="text-muted-foreground text-xs">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </div>
    </Card>
  );
}
