import React, { useState, useEffect } from 'react';
import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedFilterMovies, setSelectedFilterMovies] = useState('trending');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        switch (selectedFilterMovies) {
          case 'trending':
            setTrendingMovies(await getTrendingMovies(currentPage));
            break;
          case 'popular':
            setPopularMovies(await getPopularMovies(currentPage));
            break;
          case 'upcoming':
            setUpcomingMovies(await getUpcomingMovies(currentPage));
            break;
          default:
            break;
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedFilterMovies, currentPage]);

  const handleFilterChangeMovies = (filter) => {
    setSelectedFilterMovies(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  const moviesToDisplay =
    selectedFilterMovies === 'trending'
      ? trendingMovies
      : selectedFilterMovies === 'popular'
      ? popularMovies
      : upcomingMovies;

  return (
    <section className="content-section" id="movies">
      <div className="section-notice">
       <i className='fas fa-triangle-exclamation'></i> We do not host, store, or transmit any movies, TV shows, or other media files on our own infrastructure. The service helps you discover and access content through third‑party sources. We do not control those sources or their content.
        Please disable your ad blocker. We don&apos;t show ads while you watch. <br /> <b style={{color: '#ac77ff'}}>An account is NOT required to access and use DevEvil TV.</b>
      </div>

      <SectionHeader title="Movies" icon="fa-solid fa-film">
        <div className="filter-radios">
          <input type="radio" name="grade" id="trending" checked={selectedFilterMovies === 'trending'} onChange={() => handleFilterChangeMovies('trending')} />
          <label htmlFor="trending">Trending</label>
          <input type="radio" name="grade" id="popular" checked={selectedFilterMovies === 'popular'} onChange={() => handleFilterChangeMovies('popular')} />
          <label htmlFor="popular">Popular</label>
          <input type="radio" name="grade" id="upcoming" checked={selectedFilterMovies === 'upcoming'} onChange={() => handleFilterChangeMovies('upcoming')} />
          <label htmlFor="upcoming">Upcoming</label>
          <div className="checked-radio-bg" />
        </div>
      </SectionHeader>

      {loading ? (
        <LoadingSpinner label="Loading movies" />
      ) : (
        <div className="media-grid">
          {moviesToDisplay.slice(0, 20).map((movie) => (
            <MediaGridCard key={movie.id} item={movie} linkTo={`/movie/${movie.id}`} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default Movies;
