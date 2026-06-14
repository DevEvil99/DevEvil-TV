import React from 'react';
import { Link } from 'react-router-dom';
import { useContinueWatching } from '../context/ContinueWatchingContext';
import '../styles/ContinueWatching.css';

const ContinueWatching = () => {
  const { continueList, removeFromContinueWatching } = useContinueWatching();

  if (continueList.length === 0) return null;

  const getPlayUrl = (item) => {
    if (item.media_type === 'tv' && item.season && item.episode) {
      return `/player/${item.id}?e=${item.episode}&s=${item.season}`;
    }
    return `/player/${item.id}`;
  };

  return (
    <section className="content-section continue-watching" id="continue">
      <div className="section-header">
        <h2 className="section-header__title">
          Continue Watching <i className="fa-solid fa-clock-rotate-left"></i>
        </h2>
      </div>
      <div className="continue-row">
        {continueList.map((item) => (
          <div className="continue-card" key={`${item.media_type}-${item.id}`}>
            <Link to={getPlayUrl(item)} className="continue-card-link">
              <div className="continue-poster">
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                ) : (
                  <div className="continue-poster-placeholder">
                    <i className="fa-solid fa-film"></i>
                  </div>
                )}
                <div className="continue-overlay">
                  <i className="fa-solid fa-circle-play"></i>
                </div>
              </div>
              <div className="continue-info">
                <p className="continue-title">{item.title || item.name}</p>
                {item.media_type === 'tv' && item.season && (
                  <p className="continue-meta">
                    S{item.season} E{item.episode}
                  </p>
                )}
              </div>
            </Link>
            <button
              type="button"
              className="continue-remove"
              onClick={() => removeFromContinueWatching(item.id, item.media_type)}
              aria-label="Remove from Continue Watching"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;
