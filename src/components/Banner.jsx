import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../services/tmdbService';
import { Link } from 'react-router-dom';
import '../styles/Banner.css';

const Banner = () => {
  const [latestReleased, setLatestReleased] = useState(null);

  useEffect(() => {
    const fetchLatestReleased = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        const latestReleasedItem = trendingMovies[0];
        setLatestReleased(latestReleasedItem);
      } catch (error) {
        // Handle error
      }
    };

    fetchLatestReleased();
  }, []);

  
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <section className="banner" id='home'>
<div className="banner-card">
  {latestReleased && (
    <div className="banner-img-wrapper">
      <img
        className="banner-img"
        src={`https://image.tmdb.org/t/p/w1280/${latestReleased.backdrop_path}`}
        alt={latestReleased.title || latestReleased.name}
        key={latestReleased.id}
        draggable="false"
      />
    </div>
  )}


        <div className="card-content">
          <div className="card-info">

          {latestReleased && latestReleased.images && latestReleased.images.logos && latestReleased.images.logos.length > 0 && (
  <div className="logo-container">

    <img
      key={latestReleased.images.logos[0].file_path}
      src={`https://image.tmdb.org/t/p/original/${latestReleased.images.logos[0].file_path}`}
      alt={`${latestReleased.title} Logo`}
      draggable={'false'}
    />
  </div>
)}

            <div className="">
              <span>{Math.round(latestReleased && latestReleased.vote_average * 10)}%</span>
              <i style={{marginLeft: '5px'}} className="fas fa-heart"></i>
            </div>

            <div className="">
              <span>{latestReleased && latestReleased.release_date && latestReleased.release_date.substring(0,4)}</span>
            </div>


            <div className="">
              <span>{formatTime(latestReleased && latestReleased.runtime)}</span>
            </div>
            
            

            
          </div>




        </div>
      </div>


      <div className="banner-nav">
        <div className="center-text">
          <Link to={latestReleased ? `/player/${latestReleased.id}` : '/'}>
            <span>
              Watch Now <i className="fa-solid fa-play banneri"></i>
            </span>
            <p>Instantly stream the movie online.</p>
          </Link>

          <p className="line"></p>

          <Link to={latestReleased ? `/movie/${latestReleased.id}` : '/'}>
            <span>
              Movie Insights <i className="fa-solid fa-stars banneri"></i>
            </span>
            <p>Explore in-depth information about the film</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
