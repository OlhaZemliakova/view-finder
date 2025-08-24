import type { MovieItem } from "@/types/movieTypes";
import { Card } from "./ui/card";
import { Star } from "lucide-react";

type MovieCardProps = {
  movie: MovieItem;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="w-[220px] h-[350px] flex flex-col overflow-hidden p-0 shrink-0">
      <div className="h-2/3 relative">
        <img
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
          className="w-full h-full object-cover"
        />

        <Star className="w-8 h-8 absolute top-2 right-2 rounded-full bg-slate-50 text-yellow-300 hover:text-red-500 cursor-pointer transition-colors p-2" />
      </div>

      <div className="h-1/3 p-2 flex flex-col justify-between">
        <h2 className="font-semibold text-sm line-clamp-1">{movie.title}</h2>
        <p className="text-xs text-muted-foreground">
          Original language: {movie.original_language}
        </p>
        <div className="flex justify-between items-center">
          <p className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-950 text-yellow-300 text-md">
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
