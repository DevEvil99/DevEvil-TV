import React, { useState, useEffect } from 'react';
import { getIranianTv } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const IranianTv = () => {
  const [iranianTv, setIranianTv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIranian = async () => {
      setLoading(true);
      try {
        setIranianTv(await getIranianTv(currentPage));
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
    <section className="content-section" id="iraniantv">
      <SectionHeader title="Iranian TV Shows" icon="fi fi-ir" />

      {loading ? (
        <LoadingSpinner label="Loading iranian TV" />
      ) : (
        <div className="media-grid">
          {iranianTv.slice(0, 20).map((iranian) => (
            <MediaGridCard
              key={iranian.id}
              item={iranian}
              linkTo={`/tv/${iranian.id}`}
              icon="fa-star"
            />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default IranianTv;
