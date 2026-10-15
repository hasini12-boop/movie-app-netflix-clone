import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies, searchMovies } from "../api/tmdb.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loader from "../components/Loader.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import Pagination from "../components/Pagination.jsx";

export default function MovieListPage({ category, title, eyebrow, description, searchQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const loadMovies = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const result = searchQuery
        ? await searchMovies(searchQuery, page, signal)
        : await getMovies(category, page, signal);
      setData(result);
    } catch (requestError) {
      if (requestError.name !== "AbortError") setError(requestError.message || "Unable to load movies.");
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [category, page, searchQuery, refreshKey]);

  useEffect(() => {
    const controller = new AbortController();
    loadMovies(controller.signal);
    return () => controller.abort();
  }, [loadMovies]);

  function changePage(nextPage) {
    if (nextPage < 1 || (data && nextPage > data.total_pages)) return;
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage === 1) nextParams.delete("page");
    else nextParams.set("page", String(nextPage));
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="container listing-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {!searchQuery && <span className="collection-tag">Curated for your next movie night <span>✦</span></span>}
      </div>

      {loading && <Loader label={searchQuery ? "Searching the library..." : "Loading movies..."} />}
      {!loading && error && <ErrorMessage message={error} onRetry={() => setRefreshKey((key) => key + 1)} />}
      {!loading && !error && data && (
        <>
          {searchQuery && <p className="results-summary">{data.total_results.toLocaleString()} results for <strong>“{searchQuery}”</strong></p>}
          <MovieGrid movies={data.results || []} />
          <Pagination
            page={data.page}
            totalPages={Math.min(data.total_pages || 1, 500)}
            onPageChange={changePage}
          />
        </>
      )}
    </section>
  );
}
