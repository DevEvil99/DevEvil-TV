import React, { useState, useEffect } from 'react';
import { getTurkishTv } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const TurkishTv = () => {
  const [turkishTv, setTurkishTv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurkish = async () => {
      setLoading(true);
      try {
        setTurkishTv(await getTurkishTv(currentPage));
      } catch (error) {
        console.error('Error fetching turkish:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurkish();
  }, [currentPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  return (
    <section className="content-section" id="turkishtv">
      <SectionHeader title="Turkish TV Shows" icon="fi fi-tr" />

      {loading ? (
        <LoadingSpinner label="Loading turkish TV" />
      ) : (
        <div className="media-grid">
          {turkishTv.slice(0, 20).map((turkish) => (
            <MediaGridCard
              key={turkish.id}
              item={turkish}
              linkTo={`/tv/${turkish.id}`}
              icon="fa-star"
            />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default TurkishTv;
