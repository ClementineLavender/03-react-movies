import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const imagePath = movie.backdrop_path || movie.poster_path;
  const imageSrc = imagePath
    ? `https://image.tmdb.org/t/p/original${imagePath}`
    : "https://via.placeholder.com/1280x720?text=No+Image";

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>
        <img
          src={imageSrc}
          alt={movie.title || "Movie image"}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview || "No overview available."}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average ? `${movie.vote_average}/10` : "N/A"}
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}