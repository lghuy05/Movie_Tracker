import React, { useEffect, useState } from "react"
import heroImg from "./assets/hero.png"
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount, updateTrendingMovie } from "./appwrite.js";
import Modal from "./components/Modal.jsx";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, settrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);


  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}s=${encodeURIComponent(query)}`
        : `${API_BASE_URL}s=avengers`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.Search || []);
      if (query && data.Search.length > 0) {
        await updateSearchCount(query, data.Search[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again");
    } finally {
      setIsLoading(false);
    }
  }
  const loadTrendingMovies = async () => {
    try {
      const movies = await updateTrendingMovie();
      settrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
    }
  }

  const fetchMovieDetails = async (Title) => {
    try {
      const endpoint = `${API_BASE_URL}t=${encodeURIComponent(Title)}`;
      const response = await fetch(endpoint);
      const data = await response.json()
      return data;

    }
    catch (error) {
      console.log("Error fetching movie details: ", error)
      return null;
    }

  }
  const onClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setMovieDetails(null);
  };
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (selectedMovie && isModalOpen) {
        setIsLoadingDetails(true);
        const details = await fetchMovieDetails(selectedMovie);
        setMovieDetails(details);
        setIsLoadingDetails(false);
      }
    }
    loadMovieDetails();

  }, [selectedMovie, isModalOpen]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src={heroImg} alt="Hero Banner" />
          <h1>Find <span className="text-gradient">movies</span> you'll enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.Title} />
                </li>
              )
              )}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onMovieClick={() => {
                  setSelectedMovie(movie.Title);
                  setIsModalOpen(true);
                }} />
              ))}
            </ul>
          )}
        </section>
      </div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        {isLoadingDetails ? (
          <Spinner />
        ) : movieDetails ? (
          <div className="text-white">
            {/* Flex container for side-by-side layout */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* Left Side - Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : movienotavai}
                  alt={movieDetails.Title}
                  className="w-full max-w-xs rounded-lg shadow-lg"
                />
              </div>

              {/* Right Side - Movie Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">{movieDetails.Title} ({movieDetails.Year})</h2>

                <div className="space-y-3">
                  <p>⭐ <strong>Rating:</strong> {movieDetails.imdbRating}/10</p>
                  <p>⏱️ <strong>Runtime:</strong> {movieDetails.Runtime}</p>
                  <p>🎭 <strong>Genre:</strong> {movieDetails.Genre}</p>
                  <p>🎬 <strong>Director:</strong> {movieDetails.Director}</p>
                  <p>👥 <strong>Cast:</strong> {movieDetails.Actors}</p>
                  <p>📖 <strong>Plot:</strong> {movieDetails.Plot}</p>
                  <p>📅 <strong>Released</strong> {movieDetails.Released}</p>
                  <p>🌐 <strong>Language:</strong> {movieDetails.Language}</p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="text-white">Error loading movie details</div>
        )}
      </Modal>
    </main>
  )
}

export default App
