import { useEffect } from "react";
import { useMovieStore } from "@/store/movieStore";
import { MovieCard } from "@/components/movie-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

export function PopularMoviesPage() {
  const {
    popularMovies,
    popularPage,
    popularTotalPages,
    fetchPopularMovies,
    loadingPopular,
  } = useMovieStore();

  useEffect(() => {
    fetchPopularMovies(1);
  }, [fetchPopularMovies]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= popularTotalPages) {
      fetchPopularMovies(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>

      {loadingPopular && <p>Loading...</p>}

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {popularMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
          <MovieCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {!loadingPopular && popularTotalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(popularPage - 1)}
                  aria-disabled={popularPage <= 1}
                  className={
                    popularPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {popularPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {popularPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationLink isActive>{popularPage}</PaginationLink>
              </PaginationItem>
              {popularPage < popularTotalPages && (
                <>
                  {popularPage < popularTotalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => goToPage(popularPage + 1)}>
                        {popularPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {popularPage < popularTotalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(popularTotalPages)}>
                      {popularTotalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(popularPage + 1)}
                  aria-disabled={popularPage >= popularTotalPages}
                  className={
                    popularPage >= popularTotalPages
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
