import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getShortsData } from '../services/tmdbService';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Shorts.css';
import { Link } from 'react-router-dom';

const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const shortsContainerRef = useRef(null);
  const iframeRefs = useRef({});

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed';

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        setLoading(true);
        const shortsData = await getShortsData();
        
        if (!shortsData || shortsData.length === 0) {
          setError('No videos available at the moment.');
          setShorts([]);
        } else {
          setShorts(shortsData);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching shorts:', err);
        setError('Failed to load shorts. Please try again later.');
        setShorts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShorts();
  }, []);

  const handleScroll = useCallback(
    (e) => {
      if (!shortsContainerRef.current) return;

      const container = shortsContainerRef.current;
      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Calculate which short should be in focus
      const newIndex = Math.round(scrollPosition / containerHeight);
      setCurrentIndex(Math.min(newIndex, shorts.length - 1));
    },
    [shorts.length]
  );

  useEffect(() => {
    const container = shortsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const goToShort = (index) => {
    if (shortsContainerRef.current) {
      shortsContainerRef.current.scrollTo({
        top: index * shortsContainerRef.current.clientHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        goToShort(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        goToShort(currentIndex + 1);
      }
    },
    [currentIndex, shorts.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
      <>
        <div className="shorts-page shorts-page--loading">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error || shorts.length === 0) {
    return (
      <>
        <div className="shorts-page shorts-page--error">
          <p>{error || 'No shorts available at the moment.'}</p>
        </div>
      </>
    );
  }

  const currentShort = shorts[currentIndex];
  const currentVideo = currentShort?.videos?.[0];
  const videoKey = currentVideo?.key;

  return (
    <>
      <div className="shorts-page">
        <div className="shorts-container" ref={shortsContainerRef}>
          {shorts.map((short, index) => {
            const video = short.videos?.[0];
            return (
              <div key={`${short.id}-${index}`} className="short-item">
                {video && video.key ? (
                  <iframe
                    ref={(el) => {
                      if (el) iframeRefs.current[index] = el;
                    }}
                    className="short-video-player"
                    src={`${YOUTUBE_BASE_URL}/${video.key}?autoplay=${index === currentIndex ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&fs=1&iv_load_policy=3`}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="short-background"
                    style={{
                      backgroundImage: `url(${IMAGE_BASE_URL}${short.backdrop_path})`,
                    }}
                  >
                    <div className="short-overlay"></div>
                  </div>
                )}

                <div className="short-info-bottom">
                  <div className="short-info-content">
                    <h3 className="short-title-small">
                      {short.title}
                      <span className="short-date">{short.release_date && ` (${new Date(short.release_date).getFullYear()})`}</span>
                      <span className="short-rating">{short.vote_average && ` ${short.vote_average.toFixed(1)}`}</span>
                    </h3>
                    {short.overview && <p className="short-overview-small">{short.overview}</p>}
                  </div>

                   <Link to={short ? `/movie/${short.id}` : '/'}>
                        <button className="short-watch-btn">
                            <i className="fas fa-play"></i> Watch Now
                        </button>
                    </Link>
                </div>

                <div className="short-nav-controls">
                  <button
                    className="nav-btn nav-btn--up"
                    onClick={() => currentIndex > 0 && goToShort(currentIndex - 1)}
                    aria-label="Previous short"
                    disabled={currentIndex === 0}
                  >
                    <i className="fas fa-chevron-up"></i>
                  </button>
                
                <Link to="/">
                    <button
                    className="nav-btn" aria-label='Go to homepage'
                    title='Go to homepage'>
                    <i className={`fas fa-home`}></i>
                  </button>
                  </Link>

                  <button
                    className="video-control-btn nav-btn--mute"
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    <i className={`fas fa-volume-${isMuted ? 'mute' : 'up'}`}></i>
                  </button>

                  
                  
                  <button
                    className="nav-btn nav-btn--down"
                    onClick={() => currentIndex < shorts.length - 1 && goToShort(currentIndex + 1)}
                    aria-label="Next short"
                    disabled={currentIndex === shorts.length - 1}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </button>
                </div>
            </div>
            );
          })}
        </div>
        </div>

        <div className="shorts-pagination">
          <span className="pagination-info">
            {currentIndex + 1} / {shorts.length} 
          </span>
        </div>
    </>
  );
};

export default Shorts;
