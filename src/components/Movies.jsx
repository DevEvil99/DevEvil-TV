import React, { useState, useEffect } from 'react';
import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '../services/tmdbService';
import { Link } from 'react-router-dom';
import '../styles/main.css';
  

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedFilterMovies, setSelectedFilterMovies] = useState(
    'trending'
  ); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let movies = [];
        switch (selectedFilterMovies) {
          case 'trending':
            movies = await getTrendingMovies(currentPage);
            setTrendingMovies(movies);
            break;
          case 'popular':
            movies = await getPopularMovies(currentPage);
            setPopularMovies(movies);
            break;
          case 'upcoming':
            movies = await getUpcomingMovies(currentPage);
            setUpcomingMovies(movies);
            break;
          default:
            break;
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchMovies();
  }, [selectedFilterMovies, currentPage]);

  const handleFilterChangeMovies = (filter) => {
    setSelectedFilterMovies(filter);
    setCurrentPage(1); 
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const limitedMoviesToDisplay =
    selectedFilterMovies === 'trending'
      ? trendingMovies.slice(0, 20)
      : selectedFilterMovies === 'popular'
      ? popularMovies.slice(0, 20)
      : upcomingMovies.slice(0, 20);


      
      

  return (
    <section className="movies" id='movies'>
      <div className="filter-bar">
      <p style={{textAlign:'center', textTransform:'uppercase', width:'100%'}}>NOTE: DevEvil TV DOES NOT HOST ANY VIDEOS, ONLY PROVIDES EMBEDDED LINKS TO OTHER HOSTED CONTENT <br /><br /> Please disable AD blocker <br/>We dont show ads while you watch movies/series</p>
        </div>


    <div className="filter-bar">
      <h1>Movies <i className="fa-solid fa-camera-movie"></i></h1>
      <div className="filter-radios">
            <input
              type="radio"
              name="grade"
              id="trending"
              checked={selectedFilterMovies === 'trending'}
              onChange={() => handleFilterChangeMovies('trending')}
            />
            <label htmlFor="trending">Trending</label>
            <input
              type="radio"
              name="grade"
              id="popular"
              checked={selectedFilterMovies === 'popular'}
              onChange={() => handleFilterChangeMovies('popular')}
            />
            <label htmlFor="popular">Popular</label>
            <input
              type="radio"
              name="grade"
              id="upcoming"
              checked={selectedFilterMovies === 'upcoming'}
              onChange={() => handleFilterChangeMovies('upcoming')}
            />
            <label htmlFor="upcoming">Upcoming</label>
            <div className="checked-radio-bg" />
          </div>
        </div>
    <div className="movies-grid">
    {limitedMoviesToDisplay.map((movie) => (
      <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie-card">
              <div className="card-head">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="card-img" />
                <div className="card-overlay">
                  <div className="rating">
                  <i className="star-outline fa-solid fa-sparkles"></i>
                    <span>{Math.round(movie.vote_average * 10)}%</span>
                  </div>
                  <div className="play">
                  <i className="play-circle-outline fa-solid fa-circle-play"></i>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>

      <p className='page' style={{ textAlign: 'center' }}>
        <i
          className="fa-solid fa-left"
          onClick={() => handlePageChange('prev')}
        ></i>
        <span 
         className={`pagination-number ${currentPage ? 'current-page' : ''}`}
        style={{ marginRight: '10px' }}>
          {currentPage}
          </span>
        <span onClick={() => handlePageChange('next')}>{currentPage + 1}</span>
        <i
          className="fa-solid fa-right"
          onClick={() => handlePageChange('next')}
        ></i>
      </p>
    </section>
  );
};

export default Movies;
