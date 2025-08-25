import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "@/services/movieService";
import type { MovieDetailsItem } from "@/types/movieTypes";
import { LoadingState } from "@/components/loading-state";
import { formatDate } from "@/helpers/formatDate";
import { Info, Star } from "lucide-react";
import { useMovieStore } from "@/store/movieStore";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    movieService.getMovieDetails(Number(id)).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [id]);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useMovieStore();
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  function handleToggleWatchlist() {
    if (!movie) return;
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      //   addToWatchlist(movie);
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        backdrop_path: movie.backdrop_path,
      });
    }
  }

  if (loading) return <LoadingState message="Loading..." />;
  if (!movie) return <p className="p-4">Movie not found</p>;

  return (
    <div className="bg-stone-200">
      <div className="flex flex-col md:flex-row container mx-auto justify-between items-center gap-4 p-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full sm:w-80 rounded-xl shadow-lg"
        />
        <div className="space-y-2">
          <div className="flex gap-2">
            <p className="w-10 h-10 rounded-full bg-slate-700 text-yellow-300 p-2">
              {movie.vote_average.toFixed(1)}
            </p>
            <Star
              onClick={handleToggleWatchlist}
              className={`w-10 h-10 rounded-full cursor-pointer p-2 transition ${
                inWatchlist
                  ? "bg-yellow-400 text-white"
                  : "bg-slate-700 text-yellow-300 hover:text-red-500"
              }`}
            />
          </div>

          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <p className="italic text-gray-500">{movie.tagline}</p>
          <p className="mt-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p className="mt-4">
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className="mt-4">
            <strong>Release date:</strong> {formatDate(movie.release_date)}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
          <div className="flex gap-2">
            <Info /> Information about rating based on {movie.vote_count} votes
          </div>
        </div>
      </div>
    </div>
  );
}
