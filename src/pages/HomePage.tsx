import { UpcomingMoviesList } from "@/components/upcoming-movies-list";
import { PopularMoviesList } from "@/components/popular-movies-list";
import { SearchBar } from "@/components/search-bar";
import { useMovieStore } from "@/store/movieStore";
import { useEffect } from "react";

function HomePage() {
  const { fetchWatchlist } = useMovieStore();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Discover Movies</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Find your next favorite film
          </p>
          <SearchBar />
        </div>
      </section>

      <PopularMoviesList />
      <UpcomingMoviesList />
    </>
  );
}

export default HomePage;
