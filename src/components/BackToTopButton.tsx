'use client';

export function BackToTopButton() {
  return (
    <button
      id="backTop"
      className="back-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
