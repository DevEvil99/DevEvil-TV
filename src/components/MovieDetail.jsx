import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieTrailer, getMovieRecommendations, getMovieReviews } from "../services/tmdbService";
import WatchlistButton from "./WatchlistButton";
import LoadingSpinner from "./LoadingSpinner";
import MediaGridCard from "./MediaGridCard";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('suggested');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(id);
        setMovieDetails(details);
        const trailer = await getMovieTrailer(id);
        setTrailerKey(trailer);
        const reviews = await getMovieReviews(id);
        setMovieReviews(reviews.results);
      } catch {
        // silent
      }
    };

    const fetchSuggestedMovies = async () => {
      try {
        const recommendations = await getMovieRecommendations(id);
        setSuggestedMovies(recommendations.results);
      } catch {
        // silent
      }
    };

    fetchMovieDetails();
    if (activeTab === 'suggested') {
      fetchSuggestedMovies();
    }
  }, [id, activeTab]);

  if (!movieDetails) {
    return <LoadingSpinner fullScreen label="Loading movie" />;
  }

  const {
    title,
    release_date,
    runtime,
    genres,
    budget,
    revenue,
    production_countries,
    production_companies,
    overview,
    vote_average,
    images,
    credits,
    backdrop_path,
    tagline,
  } = movieDetails;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const watchlistItem = {
    id: Number(id),
    media_type: 'movie',
    title,
    poster_path: movieDetails.poster_path,
  };

  return (
    <div className="detail-page">
      <div
        className="banner-details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
      />

      <div className="detail-page-content">
        <Link to="/" className="detail-back">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>

        <div className="detail-hero">
          {images?.logos?.length > 0 ? (
            <div className="detail-logo">
              <img
                src={`https://image.tmdb.org/t/p/original/${images.logos[0].file_path}`}
                alt={`${title} logo`}
                draggable="false"
              />
            </div>
          ) : (
            <h1 className="detail-title">{title}</h1>
          )}
          {tagline && <p className="tagline">&ldquo;{tagline}&rdquo;</p>}
        </div>

        <div className="detail-meta">
          {genres.map((genre) => (
            <span key={genre.id} className="genre">{genre.name}</span>
          ))}
          <span className="detail-meta-pill detail-meta-pill--score">
            <i className="fa-solid fa-star"></i> {parseFloat(vote_average).toFixed(1).replace(/\.0$/, '')}/10
          </span>
          {release_date && (
            <span className="detail-meta-pill">
              <i className="fa-regular fa-calendar"></i> {release_date.substring(0, 4)}
            </span>
          )}
          {runtime > 0 && (
            <span className="detail-meta-pill">
              <i className="fa-regular fa-clock"></i> {formatTime(runtime)}
            </span>
          )}
          {budget > 0 && (
            <span className="detail-meta-pill">
              <i className="fa-solid fa-money-bill"></i>
              {" "}
              ${budget.toLocaleString()}
            </span>
          )}
          {revenue > 0 && (
            <span className="detail-meta-pill">
              <i className="fa-solid fa-money-bill-trend-up"></i>
              {" "}
              ${revenue.toLocaleString()}
            </span>
          )}
          {production_countries.length > 0 && (
            <span className="detail-meta-pill">
              <i className="fas fa-globe"></i> {production_countries.map(c => c.name).join(", ")}
            </span>
          )}
         {production_companies?.length > 0 && (
            <span className="detail-meta-pill">
              <i className="fas fa-building"></i>{" "}
              {production_companies.map(company => company.name).join(", ")}
            </span>
          )}
        </div>
        

        <div className="detail-actions-panel">
          <Link to={`/player/${id}`} className="detail-action-btn detail-action-btn--primary">
            <i className="fa-solid fa-play"></i> Watch Now
          </Link>

          {trailerKey && (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-action-btn detail-action-btn--secondary trailer-btn"
            >
              <i className="fab fa-youtube"></i> Trailer
            </a>
          )}

          <WatchlistButton item={watchlistItem} className="detail-action-btn detail-action-btn--secondary" />
        </div>

        <p className="overview">{overview}</p>

        <div className="detail-tabs">
          <button
            type="button"
            className={`tab-button ${activeTab === 'suggested' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggested')}
          >
            Recommendations
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'cast' ? 'active' : ''}`}
            onClick={() => setActiveTab('cast')}
          >
            Cast
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="detail-tab-content">
          {activeTab === 'suggested' && (
            <div className="media-grid">
              {suggestedMovies.slice(0, 8).map((movie) => (
                <MediaGridCard
                  key={movie.id}
                  item={movie}
                  linkTo={`/movie/${movie.id}`}
                />
              ))}
            </div>
          )}

          {activeTab === 'cast' && (
            <ul className="castul">
              {credits.cast.slice(0, 12).map((cast) => (
                <li key={cast.id}>
                  {cast.profile_path ? (
                    <>
                      <img
                        className="cast-poster"
                        src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
                        alt={cast.name}
                        draggable="false"
                      />
                      <p>{cast.name}</p>
                    </>
                  ) : (
                    <div className="cast-poster media-grid-card__placeholder" style={{ height: 195 }}>
                      <i className="fa-solid fa-user"></i>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'reviews' && (
            <ul className="reviews-list">
              <div className="section-notice">
               <i className='fas fa-triangle-exclamation'></i> These reviews are provided by users of TMDB and do not reflect the views or opinions of this website. We do not endorse, verify, or reject any user-submitted reviews. Reviews may contain spoilers, opinions, or information that some viewers may find inaccurate or subjective.
              </div>
              {movieReviews.length === 0 ? (
                <li className="review"><p>No reviews yet.</p></li>
              ) : (
                movieReviews.map((review) => (
                  <li key={review.id} className="review">
                    <p>Review by {review.author}</p>
                    <p>{review.content}</p>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
