// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import { getMoviesByGenre, getGenres, getTvGenres, getTvByGenre } from '../services/tmdbService';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import '../styles/main.css';

const Categories = () => {
  const [moviesByCategory, setMoviesByCategory] = useState([]);
  const [tvByCategory, setTvByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('28');
  const [selectedTvCategory, setSelectedTvCategory] = useState('10759');
  const [genres, setGenres] = useState([]);
  const [genrestv, setTvGenres] = useState([]);
  const [currentPageMovies, setCurrentPageMovies] = useState(1);
  const [currentPageTv, setCurrentPageTv] = useState(1);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTv, setLoadingTv] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setGenres(await getGenres());
        setTvGenres(await getTvGenres());
      } catch {
        // silent
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!selectedCategory) return;
      setLoadingMovies(true);
      try {
        setMoviesByCategory(await getMoviesByGenre(selectedCategory, currentPageMovies));
      } catch {
        // silent
      } finally {
        setLoadingMovies(false);
      }
    };
    fetchMovies();
  }, [selectedCategory, currentPageMovies]);

  useEffect(() => {
    const fetchTv = async () => {
      if (!selectedTvCategory) return;
      setLoadingTv(true);
      try {
        setTvByCategory(await getTvByGenre(selectedTvCategory, currentPageTv));
      } catch {
        // silent
      } finally {
        setLoadingTv(false);
      }
    };
    fetchTv();
  }, [selectedTvCategory, currentPageTv]);

  return (
    <>
      <section className="content-section" id="categories">
        <SectionHeader title="Movie Categories" icon="fa-solid fa-list">
          <select
            id="category"
            className="genre"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPageMovies(1);
            }}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </SectionHeader>

        {loadingMovies ? (
          <LoadingSpinner label="Loading movies" />
        ) : (
          <div className="media-grid">
            {moviesByCategory.slice(0, 20).map((movie) => (
              <MediaGridCard key={movie.id} item={movie} linkTo={`/movie/${movie.id}`} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPageMovies}
          onPageChange={(dir) =>
            setCurrentPageMovies((p) => (dir === 'next' ? p + 1 : Math.max(p - 1, 1)))
          }
        />
      </section>

      <section className="content-section">
        <SectionHeader title="TV Show Categories" icon="fa-solid fa-list">
          <select
            id="categorytv"
            className="genre"
            value={selectedTvCategory}
            onChange={(e) => {
              setSelectedTvCategory(e.target.value);
              setCurrentPageTv(1);
            }}
          >
            {genrestv.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </SectionHeader>

        {loadingTv ? (
          <LoadingSpinner label="Loading TV shows" />
        ) : (
          <div className="media-grid">
            {tvByCategory.slice(0, 20).map((tv) => (
              <MediaGridCard key={tv.id} item={tv} linkTo={`/tv/${tv.id}`} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPageTv}
          onPageChange={(dir) =>
            setCurrentPageTv((p) => (dir === 'next' ? p + 1 : Math.max(p - 1, 1)))
          }
        />
      </section>
    </>
  );
};

export default Categories;
