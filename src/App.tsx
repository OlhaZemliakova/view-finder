import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Layout from "./components/layout/layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegistrationPage } from "./pages/auth/RegistrationPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import TVShowsPage from "./pages/TVShowsPage";
import WatchlistPage from "./pages/WatchListPage";
import { ProtectedRoute } from "@/components/protected-route";
import { PopularMoviesPage } from "./pages/PopularMoviesPage";
import { UpcomingMoviesPage } from "./pages/UpcomingMoviesPage";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchResultsPage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        <Route path="tv-shows" element={<TVShowsPage />} />
        <Route path="watch-list" element={<WatchlistPage />} />
        <Route path="/movies/popular" element={<PopularMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
