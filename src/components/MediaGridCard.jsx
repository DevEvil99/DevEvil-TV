import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MediaGridCard = ({ item, linkTo, icon = 'fa-star' }) => {
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || '').substring(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1).replace(/\.0$/, '') : null;

  return (
    <Link to={linkTo} className="media-grid-card">
      <div className="media-grid-card__poster">
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt={title}
            className="media-grid-card__img"
          />
        ) : (
          <div className="media-grid-card__placeholder">
            <i className="fa-solid fa-film"></i>
          </div>
        )}
        <div className="media-grid-card__overlay">
          <i className="fa-solid fa-circle-play media-grid-card__play"></i>
        </div>
        {rating !== null && (
          <span className="media-grid-card__badge">
            <i className={`fa-solid ${icon}`}></i> {parseFloat(rating)}/10
          </span>
        )}
      </div>
      <div className="media-grid-card__info">
        <p className="media-grid-card__title">{title}</p>
        {year && <span className="media-grid-card__year">{year}</span>}
      </div>
    </Link>
  );
};

MediaGridCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  linkTo: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default MediaGridCard;
