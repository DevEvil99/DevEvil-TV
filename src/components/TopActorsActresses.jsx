import React, { useState, useEffect } from 'react';
import { getTopActors } from '../services/tmdbService';

const TopActorsActresses = () => {
  const [topActors, setTopActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTopActorsActresses = async () => {
      try {

        const actorsData = await getTopActors(currentPage);
        setTopActors(actorsData);
      } catch (error) {
        console.error('Error fetching top actors and actresses:', error);
      }
    };

    fetchTopActorsActresses();
  }, [currentPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const limit = topActors.slice(0, 20);

  return (
    <section className="movies" id='performers'>

      <div className="filter-bar">
        <h1>Popular Performers <i className="fa-solid fa-people-group"></i></h1>
      </div>

      <div className="movies-grid">
        {limit.map((actor) => (
          <div className="movie-card" key={actor.id}>
            <a href={`https://en.wikipedia.org/wiki/${actor.name}`} target='_blank' rel='noreferrer noopener'>
            <div className="card-head">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="card-img"
              />
            </div>
            </a>
            <p>{actor.name}</p>
          </div>
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

export default TopActorsActresses;