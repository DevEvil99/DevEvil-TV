import React, { useState, useEffect } from 'react';
import { getMoviesByGenre, getGenres, getTvGenres, getTvByGenre } from '../services/tmdbService';
import { Link } from "react-router-dom";

const Categories = () => {
  const [moviesByCategory, setMoviesByCategory] = useState([]);
  const [tvByCategory, setTvByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('28');
  const [selectedTvCategory, setSelectedTvCategory] = useState('10759');
  const [genres, setGenres] = useState([]);
  const [genrestv, setTvGenres] = useState([]);
  const [currentPageMovies, setCurrentPageMovies] = useState(1);
  const [currentPageTv, setCurrentPageTv] = useState(1);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);

        const fetchedGenres2 = await getTvGenres();
        setTvGenres(fetchedGenres2);
      } catch (error) {
        // Handle error
      }
    };

    fetchGenresAndMovies();
  }, []);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      if (selectedCategory) {
        try {
          const movies = await getMoviesByGenre(selectedCategory, currentPageMovies);
          setMoviesByCategory(movies);
        } catch (error) {
          // Handle error
        }
      } else {
        setMoviesByCategory([]);
      }
    };

    fetchMoviesByCategory();
  }, [selectedCategory, currentPageMovies]);

  useEffect(() => {
    const fetchTvByCategory = async () => {
      if (selectedTvCategory) {
        try {
          const tv = await getTvByGenre(selectedTvCategory, currentPageTv);
          setTvByCategory(tv);
        } catch (error) {
          // Handle error
        }
      } else {

        setTvByCategory([]);
      }
    };

    fetchTvByCategory();
  }, [selectedTvCategory, currentPageTv]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPageMovies(1);
  };

  const handleTvCategoryChange = (categorytv) => {
    setSelectedTvCategory(categorytv);
    setCurrentPageTv(1);
  };

  const limitmovie = moviesByCategory.slice(0, 20);
  const limittv = tvByCategory.slice(0, 20);

  const handlePageChangeMovies = (direction) => {
    setCurrentPageMovies((prevPage) => (direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)));
  };
  
  const handlePageChangeTv = (direction) => {
    setCurrentPageTv((prevPage) => (direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)));
  };

  return (
    <div>
      <section className="movies" id='categories'>

        <div className="filter-bar">
          <h1>Movie Categories <i className="fa-solid fa-popcorn"></i></h1>
          <div className="filter-dropdown">
            <select
              id="category"
              className='genre'
              name='genre'
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="movies-grid">
          {limitmovie.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="movie-card">
                <div className="card-head">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="card-img" />
                  <div className="card-overlay">
                    <div className="rating">
                      <i className="star-outline fa-solid fa-sparkles"></i>
                      <span>{Math.round(movie.vote_average * 10)}%</span>
                    </div>
                    <div className="play">
                      <i className="play-circle-outline fa-solid fa-circle-play"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className='page' style={{ textAlign: 'center' }}>
        <i
          className="fa-solid fa-left"
          onClick={() => handlePageChangeMovies('prev')}
        ></i>
                <span 
         className={`pagination-number ${currentPageMovies ? 'current-page' : ''}`}
        style={{ marginRight: '10px' }}>
          {currentPageMovies}
          </span>
        <span onClick={() => handlePageChangeMovies('next')}>{currentPageMovies + 1}</span>
        <i
          className="fa-solid fa-right"
          onClick={() => handlePageChangeMovies('next')}
        ></i>
      </p>
      </section>

      <section className="movies">
        <div className="filter-bar">
          <h1>TV Show Categories <i className="fa-solid fa-popcorn"></i></h1>
          <div className="filter-dropdown">
            <select
              id="categorytv"
              className='genre'
              name='genre'
              value={selectedTvCategory}
              onChange={(e) => handleTvCategoryChange(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {genrestv.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="movies-grid">
          {limittv.map((tv) => (
            <Link to={`/tv/${tv.id}`} key={tv.id}>
              <div className="movie-card">
                <div className="card-head">
                  <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt={tv.title} className="card-img" />
                  <div className="card-overlay">
                    <div className="rating">
                      <i className="star-outline fa-solid fa-sparkles"></i>
                      <span>{Math.round(tv.vote_average * 10)}%</span>
                    </div>
                    <div className="play">
                      <i className="play-circle-outline fa-solid fa-circle-play"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
         <p className='page' style={{ textAlign: 'center' }}>
        <i
          className="fa-solid fa-left"
          onClick={() => handlePageChangeTv('prev')}
        ></i>
                <span 
         className={`pagination-number ${currentPageTv ? 'current-page' : ''}`}
        style={{ marginRight: '10px' }}>
          {currentPageTv}
          </span>
        <span onClick={() => handlePageChangeTv('next')}>{currentPageTv + 1}</span>
        <i
          className="fa-solid fa-right"
          onClick={() => handlePageChangeTv('next')}
        ></i>
      </p>
      </section>
    </div>
  );
};

export default Categories;
