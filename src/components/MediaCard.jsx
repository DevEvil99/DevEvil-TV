// src/components/MediaCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MediaCard = ({ media }) => {
  const linkTo = media.media_type === 'movie' ? `/movie/${media.id}` : `/tv/${media.id}`;
  const title = media.title || media.name;

  return (
    <div className="media-card">
      <Link to={linkTo}>
        {media.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={title}
          />
        ) : (
          <div className="media-card-placeholder">
            <i className="fa-solid fa-film"></i>
          </div>
        )}
        <div className="media-card-info">
          <p className="media-card-title">{title}</p>
          <span className="media-card-type">
            {media.media_type === 'movie' ? 'Movie' : 'TV Show'}
          </span>
        </div>
      </Link>
    </div>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    media_type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default MediaCard;
