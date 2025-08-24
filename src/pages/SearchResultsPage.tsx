import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useMovieStore } from "@/store/movieStore";
import { SearchResultsList } from "@/components/search-results-list";
import { Button } from "@/components/ui/button";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchResults = useMovieStore((s) => s.searchResults);
  const loadingSearch = useMovieStore((s) => s.loadingSearch);
  const errorSearch = useMovieStore((s) => s.errorSearch);
  const searchMovies = useMovieStore((s) => s.searchMovies);

  useEffect(() => {
    if (query.trim()) {
      searchMovies(query);
    }
  }, [query, searchMovies]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search results for “{query}”</h1>

      {errorSearch && <p className="text-red-500">Error: {errorSearch}</p>}

      <SearchResultsList movies={searchResults} loading={loadingSearch} />

      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          <Button variant="link">← Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
