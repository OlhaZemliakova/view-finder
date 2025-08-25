import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Layout from "./components/layout/layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegistrationPage } from "./pages/auth/RegistrationPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import TVShowsPage from "./pages/TVShowsPage";
import WatchlistPage from "./pages/WatchListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchResultsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="tv-shows" element={<TVShowsPage />} />
        <Route path="watch-list" element={<WatchlistPage />} />
      </Route>
    </Routes>
  );
}

export default App;
