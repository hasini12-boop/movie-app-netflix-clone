import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search") {
      setQuery(new URLSearchParams(location.search).get("query") || "");
    }
  }, [location.pathname, location.search]);

  function handleSearch(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/search?query=${encodeURIComponent(value)}`);
  }

  return (
    <header className="site-header">
      <div className="navbar container">
        <Link to="/" className="brand" aria-label="MovieDB home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>movie<span className="brand-accent">db</span></span>
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink to="/" end>Discover</NavLink>
          <NavLink to="/top-rated">Top rated</NavLink>
          <NavLink to="/upcoming">Upcoming</NavLink>
        </nav>
        <form className="search-form" onSubmit={handleSearch} role="search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
          <button type="submit" aria-label="Submit movie search">↵</button>
        </form>
      </div>
    </header>
  );
}
