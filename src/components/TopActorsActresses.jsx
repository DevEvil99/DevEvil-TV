import React, { useState, useEffect } from 'react';
import { getTopActors } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const TopActorsActresses = () => {
  const [topActors, setTopActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopActorsActresses = async () => {
      setLoading(true);
      try {
        setTopActors(await getTopActors(currentPage));
      } catch (error) {
        console.error('Error fetching top actors and actresses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopActorsActresses();
  }, [currentPage]);

  return (
    <section className="content-section" id="performers">
     
      <SectionHeader title="Popular Performers" icon="fa-solid fa-people-group" />

      {loading ? (
        <LoadingSpinner label="Loading performers" />
      ) : (
        <div className="media-grid">
          {topActors.slice(0, 20).map((actor) => (
            <a
              key={actor.id}
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(actor.name.replace(/ /g, '_'))}`}
              target="_blank"
              rel="noreferrer noopener"
              className="media-grid-card"
            >
              <div className="media-grid-card__poster">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    className="media-grid-card__img"
                  />
                ) : (
                  <div className="media-grid-card__placeholder">
                    <i className="fa-solid fa-user"></i>
                  </div>
                )}
                <div className="media-grid-card__overlay">
                  <i className="fa-brands fa-wikipedia-w media-grid-card__play"></i>
                </div>
              </div>
              <div className="media-grid-card__info">
                <p className="media-grid-card__title">{actor.name}</p>
                <span className="media-grid-card__year">Actor</span>
              </div>
            </a>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onPageChange={(dir) =>
          setCurrentPage((p) => (dir === 'next' ? p + 1 : Math.max(p - 1, 1)))
        }
      />
    </section>
  );
};

export default TopActorsActresses;
