import React from 'react';
import PropTypes from 'prop-types';
import { useWatchlist } from '../context/WatchlistContext';
import { useToast } from '../context/ToastContext';

const WatchlistButton = ({ item, className = '', showLabel = true }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { showToast } = useToast();
  const inList = isInWatchlist(item.id, item.media_type);
  const isDetailBtn = className.includes('detail-action-btn');

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWatchlist(item);
    const title = item.title || item.name || 'Item';
    showToast(
      added ? `"${title}" added to My List` : `"${title}" removed from My List`,
      'success'
    );
  };

  return (
    <button
      type="button"
      className={`watchlist-btn ${inList ? 'watchlist-btn--active' : ''} ${className}`}
      onClick={handleClick}
      aria-label={inList ? 'Remove from My List' : 'Add to My List'}
      title={inList ? 'Remove from My List' : 'Add to My List'}
    >
      <i className={`${inList ? 'fas fa-bookmark' : 'far fa-bookmark'}`}></i>
      {showLabel && <span>{inList ? (isDetailBtn ? 'Saved' : 'In My List') : 'My List'}</span>}
    </button>
  );
};

WatchlistButton.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default WatchlistButton;
