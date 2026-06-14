import React, { useState, useEffect } from 'react';
import { getIranianMovies } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const Iranian = () => {
  const [iranianMovies, setIranianMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIranian = async () => {
      setLoading(true);
      try {
        setIranianMovies(await getIranianMovies(currentPage));
      } catch (error) {
        console.error('Error fetching iranian:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIranian();
  }, [currentPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  return (
    <section className="content-section" id="iranian">
      <SectionHeader title="Iranian Movies" icon="fi fi-ir" />

      {loading ? (
        <LoadingSpinner label="Loading iranian" />
      ) : (
        <div className="media-grid">
          {iranianMovies.slice(0, 20).map((iranian) => (
            <MediaGridCard
              key={iranian.id}
              item={iranian}
              linkTo={`/movie/${iranian.id}`}
              icon="fa-star"
            />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default Iranian;
