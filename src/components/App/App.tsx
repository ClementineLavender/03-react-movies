import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";

import { fetchMovies } from "../../services/movieServices";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setMovies([]);
    setIsLoading(true);

    try {
      const data = await fetchMovies(query);
      const moviesData = data?.results || data;

      if (!moviesData || moviesData.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(moviesData);
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
    </div>
  );
}
