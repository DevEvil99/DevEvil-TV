import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MediaCard = ({ media }) => {
  const linkTo = media.media_type === 'movie' ? `/movie/${media.id}` : `/tv/${media.id}`;

  return (
    <div className="media-card">
      <Link to={linkTo}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
          alt={media.title || media.name}
        />
      </Link>
    </div>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    media_type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string, 
    name: PropTypes.string, 
  }).isRequired,
};

export default MediaCard;
 