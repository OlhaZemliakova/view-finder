import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useMovieStore } from "@/store/movieStore";
import { SearchResultsList } from "@/components/search-results-list";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
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

  const goToPage = (page: number) => {
    if (page >= 1 && page <= searchTotalPages) {
      searchMovies(query, page);
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
      {!loadingSearch && searchResults.length > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(searchPage - 1)}
                  aria-disabled={searchPage <= 1}
                  className={
                    searchPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {searchPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {searchPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationLink isActive>{searchPage}</PaginationLink>
              </PaginationItem>
              {searchPage < searchTotalPages && (
                <>
                  {searchPage < searchTotalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => goToPage(searchPage + 1)}>
                        {searchPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {searchPage < searchTotalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(searchTotalPages)}>
                      {searchTotalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(searchPage + 1)}
                  aria-disabled={searchPage >= searchTotalPages}
                  className={
                    searchPage >= searchTotalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
