import css from "./MovieGrid.module.css";

export default function MovieGrid({ movies, onSelect }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://dl.dir.freebsd.org/doc/en_US.ISO8859-1/books/handbook/placeholder.png";

        return (
          <li key={movie.id}>
            <div
              className={css.card}
              onClick={() => onSelect?.(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect?.(movie);
                }
              }}
            >
              <img
                className={css.image}
                src={posterUrl}
                alt={movie.title || "Movie poster"}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
