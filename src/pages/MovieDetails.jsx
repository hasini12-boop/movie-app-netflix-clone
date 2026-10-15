import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieCredits, getMovieDetails, imageUrl } from "../api/tmdb.js";
import CastList from "../components/CastList.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";

function money(amount) {
  return amount ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount) : "—";
}

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      setMovie(null);
      try {
        const [details, credits] = await Promise.all([
          getMovieDetails(movieId, controller.signal),
          getMovieCredits(movieId, controller.signal),
        ]);
        setMovie(details);
        setCast(credits.cast || []);
      } catch (requestError) {
        if (requestError.name !== "AbortError") setError(requestError.message || "Unable to load this movie.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [movieId, refreshKey]);

  if (loading) return <div className="container detail-loading"><Loader label="Gathering the details..." /></div>;
  if (error) return <div className="container detail-loading"><ErrorMessage message={error} onRetry={() => setRefreshKey((key) => key + 1)} /></div>;
  if (!movie) return null;

  const backdrop = imageUrl(movie.backdrop_path, "original");
  const poster = imageUrl(movie.poster_path);
  const score = Number(movie.vote_average);
  const release = movie.release_date
    ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${movie.release_date}T00:00:00Z`))
    : "Release date unknown";

  return (
    <article className="movie-detail">
      <div className="detail-backdrop" style={backdrop ? { backgroundImage: `url("${backdrop}")` } : undefined} />
      <div className="detail-scrim" />
      <div className="container detail-content">
        <button className="back-button" onClick={() => navigate(-1)}>← <span>Go back</span></button>
        <div className="detail-main">
          <div className="detail-poster">
            {poster ? <img src={poster} alt={`${movie.title} poster`} /> : <div className="poster-fallback"><span>🎬</span><small>Poster unavailable</small></div>}
          </div>
          <div className="detail-copy">
            <span className="eyebrow"><span className="eyebrow-dot" />MOVIE SPOTLIGHT</span>
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="movie-tagline">“{movie.tagline}”</p>}
            <div className="detail-meta">
              {score > 0 && <span className="detail-score">★ {score.toFixed(1)} <small>/ 10</small></span>}
              <span>{release}</span>
              {movie.runtime > 0 && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
            </div>
            {movie.genres?.length > 0 && <div className="genre-list">{movie.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>}
            <h2>Overview</h2>
            <p className="overview">{movie.overview || "No overview is available for this movie yet."}</p>
            <div className="finance-grid">
              <div><span>Budget</span><strong>{money(movie.budget)}</strong></div>
              <div><span>Box office</span><strong>{money(movie.revenue)}</strong></div>
              <div><span>Status</span><strong>{movie.status || "—"}</strong></div>
            </div>
          </div>
        </div>
        <section className="cast-section">
          <div className="section-title-row">
            <div><span className="eyebrow">THE PEOPLE BEHIND IT</span><h2>Meet the cast</h2></div>
            <span className="cast-count">{cast.length} credited actors</span>
          </div>
          <CastList cast={cast} />
        </section>
        <Link className="text-link detail-return" to="/">← Back to discover</Link>
      </div>
    </article>
  );
}
