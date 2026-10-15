export default function Loader({ label = "Finding the good stuff..." }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
