// src/components/Banner.js
import React, { useState, useEffect, useCallback } from 'react';
import { getBannerMovies } from '../services/tmdbService';
import { Link } from 'react-router-dom';
import '../styles/Banner.css';

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBannerMovies();
        setMovies(data.filter((m) => m.backdrop_path));
      } catch {
        // silent
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    if (movies.length <= 1) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const active = movies[activeIndex];

  return (
    <section className="banner" id="home">
      <div className="banner-card">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`banner-slide ${index === activeIndex ? 'banner-slide--active' : ''}`}
          >
            <div className="banner-img-wrapper">
              <img
                className="banner-img"
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                alt={movie.title}
                draggable="false"
              />
              <div className="banner-gradient"></div>
            </div>
          </div>
        ))}

        {active && (
          <div className="card-content">
            <div className="banner-text">
              <h1 className="banner-title">{active.title}</h1>
              <p className="banner-overview">
                {active.overview?.length > 180
                  ? `${active.overview.substring(0, 180)}...`
                  : active.overview}
              </p>
            </div>
            <div className="card-info">
              <div>
                <span>{parseFloat(active.vote_average).toFixed(1).replace(/\.0$/, '')}/10</span>
                <i style={{ marginLeft: '5px' }} className="fas fa-star"></i>
              </div>
              {active.release_date && (
                <div>
                  <span>{active.release_date.substring(0, 4)}</span>
                  <i style={{ marginLeft: '5px' }} className="fas fa-calendar"></i>
                </div>
              )}
            </div>
          </div>
        )}

        {movies.length > 1 && (
          <>
            <button
              type="button"
              className="banner-arrow banner-arrow--prev"
              onClick={() => goTo((activeIndex - 1 + movies.length) % movies.length)}
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              className="banner-arrow banner-arrow--next"
              onClick={() => goTo((activeIndex + 1) % movies.length)}
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="banner-dots">
              {movies.map((movie, index) => (
                <button
                  type="button"
                  key={movie.id}
                  className={`banner-dot ${index === activeIndex ? 'banner-dot--active' : ''}`}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="banner-nav">
          <div className="center-text">
            <Link to={active ? `/player/${active.id}` : '/'}>
              <span>
                Watch Now <i className="fa-solid fa-play banneri"></i>
              </span>
              <p>Instantly stream the movie online.</p>
            </Link>

            <p className="line"></p>

            <Link to={active ? `/movie/${active.id}` : '/'}>
              <span>
                Movie Insights <i className="fa-solid fa-circle-info banneri"></i>
              </span>
              <p>Explore in-depth information about the film</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
