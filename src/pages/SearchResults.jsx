import { Navigate, useSearchParams } from "react-router-dom";
import MovieListPage from "./MovieListPage.jsx";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  if (!query) return <Navigate to="/" replace />;

  return (
    <MovieListPage
      searchQuery={query}
      title="Your search, your stories."
      eyebrow="SEARCH RESULTS"
      description="A little digging through the movie universe."
    />
  );
}
