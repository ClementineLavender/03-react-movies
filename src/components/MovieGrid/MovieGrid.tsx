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
          : "https://via.placeholder.com/500x750?text=No+Poster";

        return (
          <li key={movie.id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
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
