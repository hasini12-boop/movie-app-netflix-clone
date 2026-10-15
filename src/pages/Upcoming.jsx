import MovieListPage from "./MovieListPage.jsx";

export default function Upcoming() {
  return (
    <MovieListPage
      category="upcoming"
      title="Something good is coming."
      eyebrow="FIRST LOOK"
      description="Your watchlist called. These are the films worth waiting for."
    />
  );
}
