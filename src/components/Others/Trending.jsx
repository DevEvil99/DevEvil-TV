import React, { useState, useEffect } from 'react';
import '../../styles/SideBar.css';
import { Link } from 'react-router-dom';
import { getNowPlayingMovies } from '../../services/tmdbService';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getNowPlayingMovies();
        setTrendingMovies(movies.slice(0, 3)); 
      } catch (error) {
        // Handle error
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="sidebar-trending">
      <h1>Now Playing</h1>
      <ul className='menu-list'>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
			<img draggable='false' className='poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
