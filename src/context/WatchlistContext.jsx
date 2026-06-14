import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'devevil_tv_watchlist';

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((item) => {
    setWatchlist((prev) => {
      if (prev.some((w) => w.id === item.id && w.media_type === item.media_type)) {
        return prev;
      }
      return [{ ...item, addedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeFromWatchlist = useCallback((id, mediaType) => {
    setWatchlist((prev) =>
      prev.filter((w) => !(w.id === id && w.media_type === mediaType))
    );
  }, []);

  const isInWatchlist = useCallback(
    (id, mediaType) => watchlist.some((w) => w.id === Number(id) && w.media_type === mediaType),
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (item) => {
      if (isInWatchlist(item.id, item.media_type)) {
        removeFromWatchlist(item.id, item.media_type);
        return false;
      }
      addToWatchlist(item);
      return true;
    },
    [addToWatchlist, isInWatchlist, removeFromWatchlist]
  );

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

WatchlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
};
