import React, { useState, useEffect } from 'react';
import { getTrendingTvShows, getPopularTvShows, getUpcomingTvShows } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const TvShows = () => {
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [upcomingTvShows, setUpcomingTvShows] = useState([]);
  const [selectedFilterTvShows, setSelectedFilterTvShows] = useState('trending2');
  const [currentPageTv, setCurrentPageTv] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      try {
        switch (selectedFilterTvShows) {
          case 'trending2':
            setTrendingTvShows(await getTrendingTvShows(currentPageTv));
            break;
          case 'popular2':
            setPopularTvShows(await getPopularTvShows(currentPageTv));
            break;
          case 'upcoming2':
            setUpcomingTvShows(await getUpcomingTvShows(currentPageTv));
            break;
          default:
            break;
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchTvShows();
  }, [selectedFilterTvShows, currentPageTv]);

  const handleFilterChangeTvShows = (filter) => {
    setSelectedFilterTvShows(filter);
    setCurrentPageTv(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPageTv((prev) => (direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const tvToDisplay =
    selectedFilterTvShows === 'popular2'
      ? popularTvShows
      : selectedFilterTvShows === 'upcoming2'
      ? upcomingTvShows
      : trendingTvShows;

  return (
    <section className="content-section" id="tvshows">
      <SectionHeader title="TV Shows" icon="fa-solid fa-tv">
        <div className="filter-radios">
          <input type="radio" name="grade" id="trending2" checked={selectedFilterTvShows === 'trending2'} onChange={() => handleFilterChangeTvShows('trending2')} />
          <label htmlFor="trending2">Trending</label>
          <input type="radio" name="grade" id="popular2" checked={selectedFilterTvShows === 'popular2'} onChange={() => handleFilterChangeTvShows('popular2')} />
          <label htmlFor="popular2">Popular</label>
          <input type="radio" name="grade" id="upcoming2" checked={selectedFilterTvShows === 'upcoming2'} onChange={() => handleFilterChangeTvShows('upcoming2')} />
          <label htmlFor="upcoming2">Upcoming</label>
          <div className="checked-radio-bg" />
        </div>
      </SectionHeader>

      {loading ? (
        <LoadingSpinner label="Loading TV shows" />
      ) : (
        <div className="media-grid">
          {tvToDisplay.slice(0, 20).map((show) => (
            <MediaGridCard key={show.id} item={show} linkTo={`/tv/${show.id}`} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPageTv} onPageChange={handlePageChange} />
    </section>
  );
};

export default TvShows;
