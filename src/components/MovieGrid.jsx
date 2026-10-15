import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies }) {
  if (!movies.length) {
    return (
      <div className="state-card empty-state">
        <span className="state-icon" aria-hidden="true">⌕</span>
        <h2>No movies found</h2>
        <p>Try a different search, or explore another collection.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
