import React, { useState, useEffect } from 'react';
import { getTrendingTvShows, getPopularTvShows, getUpcomingTvShows } from '../services/tmdbService';
import { Link } from "react-router-dom";

const TvShows = () => {
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [upcomingTvShows, setUpcomingTvShows] = useState([]);
  const [selectedFilterTvShows, setSelectedFilterTvShows] = useState('trending2');
  const [currentPageTv, setCurrentPageTv] = useState(1);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        let tvShows = [];
        switch (selectedFilterTvShows) {
          case 'trending2':
            tvShows = await getTrendingTvShows(currentPageTv);
            setTrendingTvShows(tvShows);
            break;
          case 'popular2':
            tvShows = await getPopularTvShows(currentPageTv);
            setPopularTvShows(tvShows);
            break;
          case 'upcoming2':
            tvShows = await getUpcomingTvShows(currentPageTv);
            setUpcomingTvShows(tvShows);
            break;
          default:
            break;
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchTvShows();
  }, [selectedFilterTvShows, currentPageTv]);

  const handleFilterChangeTvShows = (filter) => {
    setSelectedFilterTvShows(filter);
    setCurrentPageTv(1); 
  };

  const handlePageChange = (direction) => {
    setCurrentPageTv((prevPage) => (direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)));
  };

  const tvToDisplay = (() => {
    switch (selectedFilterTvShows) {
      default:
        return trendingTvShows;
      case 'popular2':
        return popularTvShows;
      case 'upcoming2':
        return upcomingTvShows;
    }
  })();

  const limitedTvToDisplay = tvToDisplay.slice(0, 20);

  return (
    <section className="movies" id='tvshows'>
      <div className="filter-bar">
        <h1>TV Shows <i className="fa-solid fa-tv"></i></h1>
        <div className="filter-radios">
          <input
            type="radio"
            name="grade"
            id="trending2"
            checked={selectedFilterTvShows === 'trending2'}
            onChange={() => handleFilterChangeTvShows('trending2')}
          />
          <label htmlFor="trending2">Trending</label>
          <input
            type="radio"
            name="grade"
            id="popular2"
            checked={selectedFilterTvShows === 'popular2'}
            onChange={() => handleFilterChangeTvShows('popular2')}
          />
          <label htmlFor="popular2">Popular</label>
          <input
            type="radio"
            name="grade"
            id="upcoming2"
            checked={selectedFilterTvShows === 'upcoming2'}
            onChange={() => handleFilterChangeTvShows('upcoming2')}
          />
          <label htmlFor="upcoming2">Upcoming</label>
          <div className="checked-radio-bg" />
        </div>
      </div>

      <div className="movies-grid">
        {limitedTvToDisplay.map((show) => (
          <Link to={`/tv/${show.id}`} key={show.id}>
            <div className="movie-card">
              <div className="card-head">
                <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.title} className="card-img" />
                <div className="card-overlay">
                  <div className="rating">
                    <i className="star-outline fa-solid fa-sparkles"></i>
                    <span>{Math.round(show.vote_average * 10)}%</span>
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
         className={`pagination-number ${currentPageTv ? 'current-page' : ''}`}
        style={{ marginRight: '10px' }}>
          {currentPageTv}
          </span>
        <span onClick={() => handlePageChange('next')}>{currentPageTv + 1}</span>
        <i
          className="fa-solid fa-right"
          onClick={() => handlePageChange('next')}
        ></i>
      </p>
    </section>
  );
};

export default TvShows;
