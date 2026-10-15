import { imageUrl } from "../api/tmdb.js";

export default function CastList({ cast }) {
  if (!cast.length) return <p className="muted-copy">Cast information is not available yet.</p>;

  return (
    <div className="cast-list">
      {cast.slice(0, 12).map((person) => {
        const profile = imageUrl(person.profile_path, "w185");
        return (
          <div className="cast-card" key={person.cast_id || person.credit_id}>
            {profile
              ? <img src={profile} alt={person.name} loading="lazy" />
              : <div className="cast-fallback" aria-hidden="true">{person.name?.charAt(0) || "?"}</div>}
            <strong>{person.name}</strong>
            <span>{person.character || "Cast"}</span>
          </div>
        );
      })}
    </div>
  );
}
