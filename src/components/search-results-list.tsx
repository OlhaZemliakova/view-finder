"use client";

import type { MovieItem } from "@/types/movieTypes";
import { MovieCardHorizontal } from "./movie-card-horizontal";
import { Link } from "react-router-dom";

interface SearchResultsListProps {
  movies: MovieItem[];
  loading: boolean;
}

export function SearchResultsList({ movies, loading }: SearchResultsListProps) {
  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading search results...</p>
    );
  }

  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No results found</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <MovieCardHorizontal key={movie.id} movie={movie} />
        </Link>
      ))}
    </div>
  );
}
