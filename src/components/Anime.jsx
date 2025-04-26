import React, { useState, useEffect } from 'react';
import { getAnimeMovies } from '../services/tmdbService';
import { Link } from 'react-router-dom';

const Anime = () => {
  const [animeMovies, setAnimeMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetAnimeMovies = async () => {
      try {

        const animeData = await getAnimeMovies(currentPage);
        setAnimeMovies(animeData);
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    fetAnimeMovies();
  }, [currentPage]); 
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const limit = animeMovies.slice(0, 20);

  return (
    <section className="movies" id='anime'>

      <div className="filter-bar">
        <h1>Anime Movies <i className="fa-solid fa-paw"></i></h1>
      </div>

      <div className="movies-grid">
        {limit.map((anime) => (
		<Link to={`/movie/${anime.id}`} key={anime.id}>
          <div className="movie-card" >
            <div className="card-head">
              <img
                src={`https://image.tmdb.org/t/p/w200/${anime.poster_path}`}
                alt={anime.name}
                className="card-img"
              />

<div className="card-overlay">
                  <div className="rating">
                  <i className="star-outline fa-solid fa-sparkles"></i>
                    <span>{Math.round(anime.vote_average * 10)}%</span>
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
      <p className="page" style={{ textAlign: 'center' }}>
        <i
          className="fa-solid fa-left"
          onClick={() => handlePageChange('prev')}
        ></i>
        <span
          className={`pagination-number ${currentPage ? 'current-page' : ''}`}
          style={{ marginRight: '10px' }}
        >
          {currentPage}
        </span>
        <span onClick={() => handlePageChange('next')}>
          {currentPage + 1}
        </span>
        <i
          className="fa-solid fa-right"
          onClick={() => handlePageChange('next')}
        ></i>
      </p>
    </section>
  );
};

export default Anime;