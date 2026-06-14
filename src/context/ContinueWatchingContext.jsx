import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'devevil_tv_continue';
const MAX_ITEMS = 12;

const ContinueWatchingContext = createContext(null);

export const ContinueWatchingProvider = ({ children }) => {
  const [continueList, setContinueList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(continueList));
  }, [continueList]);

  const addToContinueWatching = useCallback((item) => {
    setContinueList((prev) => {
      const filtered = prev.filter(
        (w) => !(w.id === item.id && w.media_type === item.media_type)
      );
      return [{ ...item, watchedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  const removeFromContinueWatching = useCallback((id, mediaType) => {
    setContinueList((prev) =>
      prev.filter((w) => !(w.id === id && w.media_type === mediaType))
    );
  }, []);

  const clearContinueWatching = useCallback(() => {
    setContinueList([]);
  }, []);

  return (
    <ContinueWatchingContext.Provider
      value={{ continueList, addToContinueWatching, removeFromContinueWatching, clearContinueWatching }}
    >
      {children}
    </ContinueWatchingContext.Provider>
  );
};

ContinueWatchingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useContinueWatching = () => {
  const ctx = useContext(ContinueWatchingContext);
  if (!ctx) throw new Error('useContinueWatching must be used within ContinueWatchingProvider');
  return ctx;
};
