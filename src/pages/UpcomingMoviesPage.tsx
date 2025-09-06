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

export function UpcomingMoviesPage() {
  const {
    upcomingMovies,
    upcomingPage,
    upcomingTotalPages,
    fetchUpcomingMovies,
    loadingUpcoming,
    errorUpcoming,
  } = useMovieStore();

  useEffect(() => {
    fetchUpcomingMovies(1);
  }, [fetchUpcomingMovies]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= upcomingTotalPages) {
      fetchUpcomingMovies(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Upcoming Movies</h2>

      {loadingUpcoming && <p>Loading...</p>}
      {errorUpcoming && <p>{errorUpcoming}</p>}

      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        {upcomingMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {!loadingUpcoming && upcomingTotalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(upcomingPage - 1)}
                  aria-disabled={upcomingPage <= 1}
                  className={
                    upcomingPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {upcomingPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => goToPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {upcomingPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationLink isActive>{upcomingPage}</PaginationLink>
              </PaginationItem>
              {upcomingPage < upcomingTotalPages && (
                <>
                  {upcomingPage < upcomingTotalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => goToPage(upcomingPage + 1)}
                      >
                        {upcomingPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {upcomingPage < upcomingTotalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => goToPage(upcomingTotalPages)}
                    >
                      {upcomingTotalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(upcomingPage + 1)}
                  aria-disabled={upcomingPage >= upcomingTotalPages}
                  className={
                    upcomingPage >= upcomingTotalPages
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
