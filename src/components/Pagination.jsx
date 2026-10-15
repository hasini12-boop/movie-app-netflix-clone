function getPages(current, total) {
  const pages = new Set([1, total]);
  for (let page = Math.max(1, current - 2); page <= Math.min(total, current + 2); page += 1) {
    pages.add(page);
  }
  return [...pages].sort((a, b) => a - b);
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = getPages(page, totalPages);
  const items = [];

  pages.forEach((number, index) => {
    if (index > 0 && number - pages[index - 1] > 1) {
      items.push(<span className="page-ellipsis" key={`ellipsis-${number}`} aria-hidden="true">…</span>);
    }
    items.push(
      <button
        className={`page-number${number === page ? " active" : ""}`}
        key={number}
        onClick={() => onPageChange(number)}
        aria-label={`Go to page ${number}`}
        aria-current={number === page ? "page" : undefined}
      >
        {number}
      </button>,
    );
  });

  return (
    <nav className="pagination" aria-label="Movie pages">
      <button className="page-step" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>← <span>Previous</span></button>
      <div className="page-numbers">{items}</div>
      <button className="page-step" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}><span>Next</span> →</button>
    </nav>
  );
}
