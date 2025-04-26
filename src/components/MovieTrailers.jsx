import React, { useState, useEffect } from 'react';
import { getTrendingMovieTrailers } from '../services/tmdbService';
import '../styles/NowPlaying.css';

const MovieTrailers = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovieTrailers();
        setTrendingMovies(movies.slice(0, 20));
      } catch (error) {
        // Handle error
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className="live" id="trailers">
      <div className="filter-bar">
        <h1>
          Latest Trailers{' '}
          <i className="fa-solid fa-video"></i>
        </h1>
      </div>
      <div className="live-grid">
        {trendingMovies.map((movie) => (
          <a key={movie.id} href={`https://www.youtube.com/watch?v=${movie.trailerKey}`} target="_blank" rel='noreferrer noopener'>
            <div className="live-card">
              <div className="category-card">
                {/* Display thumbnail for the video */}
                {movie.trailerKey && (
                  <img
                    src={`https://img.youtube.com/vi/${movie.trailerKey}/mqdefault.jpg`}
                    alt={movie.title}
                  
                    className="card-img"
                  />
                )}
                <h3 className="name">{movie.title}</h3>
                <div className="card-overlay">
                  <div className="play">
                  <i style={{fontSize:"50px"}} className="play-circle-outline fa-solid fa-circle-play"></i>
                  </div>
                </div>
              </div>

              
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MovieTrailers;
