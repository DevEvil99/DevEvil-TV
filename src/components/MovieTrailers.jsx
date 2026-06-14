import React, { useState, useEffect } from 'react';
import { getTrendingMovieTrailers } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const MovieTrailers = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailers = async () => {
      setLoading(true);
      try {
        const movies = await getTrendingMovieTrailers();
        setTrailers(movies.filter((m) => m.trailerKey).slice(0, 20));
      } catch (error) {
        console.error('Error fetching trailers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailers();
  }, []);

  return (
    <section className="content-section" id="trailers">
      <SectionHeader title="Latest Trailers" icon="fa-solid fa-video" />

      {loading ? (
        <LoadingSpinner label="Loading trailers" />
      ) : (
        <div className="media-grid">
          {trailers.map((movie) => (
            <a
              key={movie.id}
              href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
              target="_blank"
              rel="noreferrer noopener"
              className="media-grid-card trailer-card"
            >
              <div className="media-grid-card__poster">
                <img
                  src={`https://img.youtube.com/vi/${movie.trailerKey}/mqdefault.jpg`}
                  alt={movie.title}
                  className="media-grid-card__img"
                />
                <div className="media-grid-card__overlay">
                  <i className="fa-brands fa-youtube media-grid-card__play"></i>
                </div>
                <span className="media-grid-card__badge">
                  <i className="fa-solid fa-play"></i> Trailer
                </span>
              </div>
              <div className="media-grid-card__info">
                <p className="media-grid-card__title">{movie.title}</p>
                <span className="media-grid-card__year">YouTube</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieTrailers;
