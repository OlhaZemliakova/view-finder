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
  const searchPage = useMovieStore((s) => s.searchPage);
  const searchTotalPages = useMovieStore((s) => s.searchTotalPages);

  useEffect(() => {
    if (query.trim()) {
      searchMovies(query, 1);
    }
  }, [query, searchMovies]);

  const handlePrev = () => {
    if (searchPage > 1) {
      searchMovies(query, searchPage - 1);
    }
  };

  const handleNext = () => {
    if (searchPage < searchTotalPages) {
      searchMovies(query, searchPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search results for “{query}”</h1>
      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          <Button variant="link">← Back to Home</Button>
        </Link>
      </div>

      {errorSearch && <p className="text-red-500">Error: {errorSearch}</p>}

      <SearchResultsList movies={searchResults} loading={loadingSearch} />

      {/* Pagination Controls */}
      {searchResults.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button disabled={searchPage <= 1} onClick={handlePrev}>
            Prev
          </Button>
          <span>
            Page {searchPage} of {searchTotalPages}
          </span>
          <Button
            disabled={searchPage >= searchTotalPages}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
