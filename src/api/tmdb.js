const API_BASE = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

async function request(path, signal) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim();
  if (!apiKey || apiKey === "your_tmdb_api_key_here") {
    throw new Error("Add your TMDB API key to a .env file as VITE_TMDB_API_KEY, then restart the dev server.");
  }

  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(
    `${API_BASE}${path}${separator}api_key=${encodeURIComponent(apiKey)}&language=en-US`,
    { signal },
  );

  if (!response.ok) {
    let message = `TMDB request failed (${response.status}).`;
    try {
      const body = await response.json();
      if (body.status_message) message = body.status_message;
    } catch {
      // Keep the HTTP status message if TMDB did not return a readable response.
    }
    throw new Error(message);
  }

  return response.json();
}

export function getMovies(category, page = 1, signal) {
  return request(`/movie/${category}?page=${page}`, signal);
}

export function searchMovies(query, page = 1, signal) {
  return request(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`, signal);
}

export function getMovieDetails(movieId, signal) {
  return request(`/movie/${encodeURIComponent(movieId)}`, signal);
}

export function getMovieCredits(movieId, signal) {
  return request(`/movie/${encodeURIComponent(movieId)}/credits`, signal);
}

export function imageUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
