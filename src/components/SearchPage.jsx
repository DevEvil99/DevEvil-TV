// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import { searchMedia } from '../services/tmdbService';
import MediaCard from './MediaCard';
import NavBar from './Others/NavBar';
import Footer from './Others/Footer';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Search.css';
import { useLocation, Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get('q') ||
      new URLSearchParams(location.search).get('search');
    if (searchParam) {
      setQuery(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return undefined;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchMedia(query.trim());
        setSearchResults(results.filter((r) => r.media_type === 'movie' || r.media_type === 'tv'));
      } catch {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="search-page">
        <div className="search-page-header">
          <input
            className="search"
            type="text"
            placeholder="Search for movies and TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {loading && <LoadingSpinner label="Searching" />}

        {!loading && query && searchResults.length === 0 && (
          <div className="search-empty">
            <i className="fas fa-search"></i>
            <p>No results for &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {!query && (
          <div className="search-empty">
            <i className="fas fa-film"></i>
            <p>Start typing to search movies and TV shows</p>
          </div>
        )}

        <div className="search-results">
          {searchResults.map((media) => (
            <MediaCard key={`${media.media_type}-${media.id}`} media={media} />
          ))}
        </div>

        <Link to="/" className="search-home-link">
          <i className="fas fa-home"></i> Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
