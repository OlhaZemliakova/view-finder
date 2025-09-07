import type { WatchlistMovie } from "@/types/movieTypes";
import { Card } from "./ui/card";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { useMovieStore } from "@/store/movieStore";

type WatchlistItemProps = {
  movie: WatchlistMovie;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function WatchlistItem({ movie }: WatchlistItemProps) {
  const { removeFromWatchlist } = useMovieStore();

  return (
    <Card className="relative mx-auto p-0 h-[120px] overflow-hidden w-full max-w-2xl">
      <div className="flex">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path} `}
            className="rounded-l-md min-width-[94px] w-[94px] h-[141px]"
          />
        ) : (
          <div className="rounded-l-md w-[94px] h-[141px] bg-gray-100 flex items-center justify-center">
            <ImageIcon className="text-gray-500" size={32} />
          </div>
        )}

        <div className="p-2 flex flex-col w-3/4">
          <h2 className="font-semibold text-lg sm:text-xl truncate">{movie.title}</h2>

          <p className="text-muted-foreground text-xs">
            {formatDate(movie.release_date)}
          </p>

          <div className="overflow-hidden">
            <p className="line-clamp-2">{(movie.overview) ? movie.overview : "The movie doesn't have an overview"}</p>
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            removeFromWatchlist(movie.id);
          }}
          variant="outline"
          size="sm"
          className="absolute top-2 right-2"
        >
          <X />
        </Button>
      </div>
    </Card>
  );
}
