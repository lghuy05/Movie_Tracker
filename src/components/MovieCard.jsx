import starsvg from "../assets/star.svg"
import movienotavai from "../assets/no-movie.png"

const MovieCard = ({ movie: { Title, Year, Poster, Language, imdbRating }, onMovieClick }) => {
  return (
    <div className="movie-card cursor-pointer" onClick={onMovieClick}>
      <img src={Poster ? Poster : movienotavai} alt={Title || "Movie poster"} />
      <div className="mt-4">
        <h3>{Title}</h3>
        <div className="text-white">
          <p>Click for more info</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
