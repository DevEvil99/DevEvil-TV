import React, { useState, useEffect } from 'react';
import { searchMedia } from '../services/tmdbService';
import MediaCard from './MediaCard';
import '../styles/Search.css';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (query.trim() !== '') {
          const results = await searchMedia(query);
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get('search');
    if (searchParam) {
      setQuery(searchParam);
    }
  }, [location.search]);

  return (
    <div>

      
      <input
        className='search'
        type="text"
        placeholder="Search for movies and TV shows"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="search-results">
        {searchResults.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>

      <div className="sidebtn">
        <ul>
          <a href="/"><li><i className='fas fa-home'></i></li></a>
        </ul>
      </div>

    </div>
  );
};

export default SearchPage;
