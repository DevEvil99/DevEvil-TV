import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { searchMedia } from '../services/tmdbService';
import LoadingSpinner from './LoadingSpinner';
import '../styles/SearchOverlay.css';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return undefined;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchMedia(query.trim());
        setResults(data.filter((r) => r.media_type === 'movie' || r.media_type === 'tv'));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const goToResult = (item) => {
    const path = item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;
    onClose();
    navigate(path);
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-overlay-input-wrap">
          <i className="fas fa-search"></i>
          <input
            ref={inputRef}
            type="text"
            className="search-overlay-input"
            placeholder="Search movies, TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="search-overlay-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="search-overlay-results">
          {loading && <LoadingSpinner label="Searching" />}
          {!loading && query && results.length === 0 && (
            <p className="search-overlay-status">No results for &ldquo;{query}&rdquo;</p>
          )}
          {!loading &&
            results.slice(0, 8).map((item) => (
              <button
                type="button"
                key={`${item.media_type}-${item.id}`}
                className="search-overlay-result"
                onClick={() => goToResult(item)}
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}
                    alt=""
                  />
                ) : (
                  <div className="search-overlay-result-placeholder">
                    <i className="fa-solid fa-film"></i>
                  </div>
                )}
                <div>
                  <p className="search-overlay-result-title">{item.title}</p>
                  <span className="search-overlay-result-type">
                    {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                  </span>
                </div>
              </button>
            ))}
          {!query && (
            <p className="search-overlay-hint">
              Press <kbd>Esc</kbd> to close · Try &ldquo;Breaking Bad&rdquo; or &ldquo;Inception&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

SearchOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchOverlay;
