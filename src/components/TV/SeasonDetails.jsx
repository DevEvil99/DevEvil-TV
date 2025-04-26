import React, { useState, useEffect } from 'react';
import { getSeasonEpisodes } from '../../services/tmdbService';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SeasonDetails = ({ tvShowId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchSeasonEpisodes = async () => {
      try {
        const seasonEpisodes = await getSeasonEpisodes(tvShowId, seasonNumber);
        setEpisodes(seasonEpisodes);
      } catch (error) {
        // Handle error
      }
    };

    fetchSeasonEpisodes(); 
  }, [tvShowId, seasonNumber]);

  return (
    <div>
      <ul className='episode-ul'>
        {episodes.map((episode, index) => (
          <li className='episode-list' key={episode.id}>
            <Link to={`/player/${tvShowId}?e=${index + 1}&s=${seasonNumber}`}>
            {episode.image && <img draggable={'false'} src={episode.image} alt={`Episode ${episode.name}`} />}
            </Link>
            
            <div className='episode-details'>
            <Link to={`/player/${tvShowId}?e=${index + 1}&s=${seasonNumber}`}>
            <p>{index + 1}. {episode.name}</p>
            </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

SeasonDetails.propTypes = {
  tvShowId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
};

export default SeasonDetails;
