// Player.js

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContinueWatching } from '../context/ContinueWatchingContext';
import { getMovieQuickInfo, getTvQuickInfo } from '../services/tmdbService';
import '../styles/Player.css';

const Player = () => {
  const { id: routeId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id') || routeId || '';
  const season = queryParams.get('s') || '';
  const episode = queryParams.get('e') || '';
  const { addToContinueWatching } = useContinueWatching();

  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    const trackWatch = async () => {
      if (!id) return;
      try {
        let item;
        if (season && episode) {
          item = await getTvQuickInfo(id);
          item.season = Number(season);
          item.episode = Number(episode);
        } else {
          item = await getMovieQuickInfo(id);
        }
        addToContinueWatching(item);
      } catch {
        // silent
      }
    };
    trackWatch();
  }, [id, season, episode, addToContinueWatching]);

  let embedUrl;
  let detailsUrl;

  if (season && episode) {
    embedUrl = `https://multiembed.mov/?video_id=${encodeURIComponent(id)}&tmdb=1&s=${encodeURIComponent(season)}&e=${encodeURIComponent(episode)}`;
    detailsUrl = `/tv/${id}`;
  } else {
    embedUrl = `https://multiembed.mov/?video_id=${encodeURIComponent(id)}&tmdb=1`;
    detailsUrl = `/movie/${id}`;
  }

  return (
    <div className="player">
      <iframe
        title="player"
        src={embedUrl}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="overlay">
        <Link to="/">
          <i className="fa-solid fa-home"></i>
        </Link>
        <Link to={detailsUrl}>
          <i className="fa-solid fa-xmark"></i>
        </Link>
      </div>

      {showAd && (
        <div className="ad">
          <i className="fa-solid fa-xmark" onClick={() => setShowAd(false)} role="button" tabIndex={0} aria-label="Close"></i>
          <h1>Support Us</h1>
          <p>
            Your donations help us maintain and improve our services, ensuring we can continue offering you this premium, ad-free entertainment every day and forever.{' '}
            <a href="https://devevil.com/#donate" rel="noreferrer" target="_blank" style={{ textDecoration: 'underline' }}>
              Support us by making a donation.
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Player;
