import MovieListPage from "./MovieListPage.jsx";

export default function TopRated() {
  return (
    <MovieListPage
      category="top_rated"
      title="The all-time greats."
      eyebrow="THE HALL OF FAME"
      description="Beloved by audiences. Rated among the very best."
    />
  );
}
