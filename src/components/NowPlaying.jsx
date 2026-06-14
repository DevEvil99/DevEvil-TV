import React, { useState, useEffect } from 'react';
import { getNowPlayingMovies } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getNowPlayingMovies();
        setMovies(data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching now playing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="content-section" id="nowplaying">
      <SectionHeader
        title="Now Playing"
        icon="fa-solid fa-circle fa-beat-fade"
      />

      {loading ? (
        <LoadingSpinner label="Loading now playing" />
      ) : (
        <div className="media-grid">
          {movies.map((movie) => (
            <MediaGridCard key={movie.id} item={movie} linkTo={`/movie/${movie.id}`} />
          ))}
        </div>
      )}
    </section>
  );
};

export default NowPlaying;
