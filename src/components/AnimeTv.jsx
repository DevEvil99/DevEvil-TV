import React, { useState, useEffect } from 'react';
import { getAnimeTv } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const AnimeTv = () => {
  const [animeTv, setAnimeTv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        setAnimeTv(await getAnimeTv(currentPage));
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [currentPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  return (
    <section className="content-section" id="animetv">
      <SectionHeader title="Anime TV Shows" icon="fi fi-jp" />

      {loading ? (
        <LoadingSpinner label="Loading anime TV" />
      ) : (
        <div className="media-grid">
          {animeTv.slice(0, 20).map((anime) => (
            <MediaGridCard
              key={anime.id}
              item={anime}
              linkTo={`/tv/${anime.id}`}
              icon="fa-star"
            />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default AnimeTv;
