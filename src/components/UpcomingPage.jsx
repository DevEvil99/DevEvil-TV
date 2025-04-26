import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingMovies, getUpcomingTvShows } from '../services/tmdbService';
import '../styles/Upcoming.css';
import NavBar from './Others/NavBar';

const UpcomingPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingTvShows, setUpcomingTvShows] = useState([]);
  const [movieStartIndex, setMovieStartIndex] = useState(0);
  const [showStartIndex, setShowStartIndex] = useState(0);
  const moviesToShow = 5;

  useEffect(() => {
    const fetchUpcomingContent = async () => {
      try {
        const movies = await getUpcomingMovies();
        const tvShows = await getUpcomingTvShows();

        setUpcomingMovies(movies);
        setUpcomingTvShows(tvShows);
      } catch (error) {
        // Handle error
      }
    };

    fetchUpcomingContent();
  }, []);

  const handleNext = (type) => {
    if (type === 'movies') {
      setMovieStartIndex((prevIndex) => prevIndex + moviesToShow);
    } else if (type === 'shows') {
      setShowStartIndex((prevIndex) => prevIndex + moviesToShow);
    }
  };

  const handlePrev = (type) => {
    if (type === 'movies') {
      setMovieStartIndex((prevIndex) => Math.max(0, prevIndex - moviesToShow));
    } else if (type === 'shows') {
      setShowStartIndex((prevIndex) => Math.max(0, prevIndex - moviesToShow));
    }
  };

  return (
    <div className='upcoming'>
		<NavBar />
     

      <h2>Upcoming Movies</h2>
      <div className="list">
        {upcomingMovies.slice(movieStartIndex, movieStartIndex + moviesToShow).map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="filmbox">
              <img className='poster' src={movie.image} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
      
      <button className='slidernext' onClick={() => handleNext('movies')} disabled={movieStartIndex + moviesToShow >= upcomingMovies.length}>
        <i className="fa fa-angle-right"></i>
      </button>
      <button className='slider' onClick={() => handlePrev('movies')} disabled={movieStartIndex === 0}>
        <i className="fa fa-angle-left"></i>
      </button>

      <h2>Upcoming TV Shows</h2>
      <div className="list">
        {upcomingTvShows.slice(showStartIndex, showStartIndex + moviesToShow).map((show) => (
          <Link key={show.id} to={`/tv/${show.id}`}>
            <div className="filmbox">
              <img className='poster' src={show.image} alt={show.name} />
            </div>
          </Link>
        ))}
      </div>

      <button className='slidernext' onClick={() => handleNext('shows')} disabled={showStartIndex + moviesToShow >= upcomingTvShows.length}>
        <i className="fa fa-angle-right"></i>
      </button>
      <button className='slider' onClick={() => handlePrev('shows')} disabled={showStartIndex === 0}>
        <i className="fa fa-angle-left"></i>
      </button>
    </div>
  );
};

export default UpcomingPage;
