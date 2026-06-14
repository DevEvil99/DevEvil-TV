import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { useToast } from '../context/ToastContext';
import NavBar from './Others/NavBar';
import Footer from './Others/Footer';
import SectionHeader from './SectionHeader';
import '../styles/MyList.css';
import '../styles/main.css';

const MyList = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { showToast } = useToast();

  const handleRemove = (item) => {
    removeFromWatchlist(item.id, item.media_type);
    showToast(`"${item.title || item.name}" removed from My List`, 'success');
  };

  const getDetailUrl = (item) =>
    item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;

  return (
    <>
      <NavBar />
      <main className="my-list-page content-section">
        <SectionHeader
          title="My List"
          icon="fa-solid fa-bookmark"
        />

        {watchlist.length === 0 ? (
          <div className="my-list-empty">
            <i className="fa-regular fa-bookmark"></i>
            <h2>Your list is empty</h2>
            <p>Browse movies and TV shows, then tap the bookmark icon to save them here.</p>
            <Link to="/" className="my-list-browse-btn">
              Browse Content
            </Link>
          </div>
        ) : (
          <div className="media-grid">
            {watchlist.map((item) => (
              <div className="my-list-card-wrap" key={`${item.media_type}-${item.id}`}>
                <Link to={getDetailUrl(item)} className="media-grid-card">
                  <div className="media-grid-card__poster">
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title || item.name}
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
                    <span className="media-grid-card__badge">
                      {item.media_type === 'movie' ? 'Movie' : 'TV'}
                    </span>
                  </div>
                  <div className="media-grid-card__info">
                    <p className="media-grid-card__title">{item.title || item.name}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="my-list-remove-btn"
                  onClick={() => handleRemove(item)}
                  aria-label="Remove from list"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MyList;
