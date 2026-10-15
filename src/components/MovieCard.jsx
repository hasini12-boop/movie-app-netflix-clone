import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb.js";

function formatYear(date) {
  return date ? date.slice(0, 4) : "Release date TBA";
}

export default function MovieCard({ movie }) {
  const poster = imageUrl(movie.poster_path);
  const rating = Number(movie.vote_average);

  return (
    <Link
      className="movie-card"
      to={`/movie/${movie.id}`}
      aria-label={`View ${movie.title || movie.name}`}
    >
      <div className="poster-wrap">
        {poster ? (
          <img src={poster} alt={`${movie.title || movie.name} poster`} loading="lazy" />
        ) : (
          <div className="poster-fallback"><span>🎬</span><small>Poster unavailable</small></div>
        )}
        {Number.isFinite(rating) && rating > 0 && (
          <span className="rating-badge"><span aria-hidden="true">★</span> {rating.toFixed(1)}</span>
        )}
        <span className="card-open" aria-hidden="true">↗</span>
      </div>
      <div className="movie-card-copy">
        <h3>{movie.title || movie.name || "Untitled"}</h3>
        <span>{formatYear(movie.release_date || movie.first_air_date)}</span>
      </div>
    </Link>
  );
}
