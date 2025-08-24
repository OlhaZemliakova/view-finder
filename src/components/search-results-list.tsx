"use client";

import type { MovieItem } from "@/types/movieTypes";
import { SearchResultItem } from "./serch-result-item";

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
    <div className="flex flex-wrap gap-4 p-4">
      {movies.map((movie) => (
        <SearchResultItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
