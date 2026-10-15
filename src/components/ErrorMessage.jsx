export default function ErrorMessage({ message, onRetry }) {
  return (
    <section className="state-card error-card" role="alert">
      <span className="state-icon" aria-hidden="true">!</span>
      <h2>Well, that’s a plot twist.</h2>
      <p>{message}</p>
      {onRetry && <button className="button button-secondary" onClick={onRetry}>Try again</button>}
    </section>
  );
}
