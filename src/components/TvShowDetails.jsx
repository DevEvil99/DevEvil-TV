import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getTvShowDetails,
  getTvRecommendations,
  getTvReviews,
  getTvTrailer
} from "../services/tmdbService";
import SeasonDetails from "./TV/SeasonDetails";
import WatchlistButton from "./WatchlistButton";
import LoadingSpinner from "./LoadingSpinner";
import MediaGridCard from "./MediaGridCard";
import "../styles/MovieDetails.css";

const TvShowDetails = () => {
  const { id } = useParams();
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("seasons");
  const [seasonTab, setSeasonTab] = useState("");
  const [suggestedTvShows, setSuggestedTvShows] = useState([]);
  const [tvReviews, setTvReviews] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const details = await getTvShowDetails(id);
        setTvShowDetails(details);
        const reviews = await getTvReviews(id);
        setTvReviews(reviews.results);
        const trailer = await getTvTrailer(id);
        setTrailerKey(trailer);
        if (details.seasons?.length > 0) {
          setSeasonTab(`season${details.seasons[0].season_number}`);
        }
      } catch {
        // silent
      }
    };

    const fetchSuggestedTvShows = async () => {
      try {
        const recommendations = await getTvRecommendations(id);
        setSuggestedTvShows(recommendations.results);
      } catch {
        // silent
      }
    };

    fetchTvShowDetails();
    if (activeTab === "suggest") {
      fetchSuggestedTvShows();
    }
  }, [id, activeTab]);

  if (!tvShowDetails) {
    return <LoadingSpinner fullScreen label="Loading TV show" />;
  }

  const {
    name,
    first_air_date,
    genres,
    overview,
    vote_average,
    created_by,
    backdrop_path,
    tagline,
    number_of_seasons,
    number_of_episodes,
    seasons,
    images,
    credits,
  } = tvShowDetails;

  const watchlistItem = {
    id: Number(id),
    media_type: 'tv',
    name,
    poster_path: tvShowDetails.poster_path,
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
                alt={`${name} logo`}
                draggable="false"
              />
            </div>
          ) : (
            <h1 className="detail-title">{name}</h1>
          )}
          {tagline && <p className="tagline">&ldquo;{tagline}&rdquo;</p>}
        </div>

        <div className="detail-meta">
          {genres?.map((genre) => (
            <span key={genre.id} className="genre">{genre.name}</span>
          ))}
          <span className="detail-meta-pill detail-meta-pill--score">
            <i className="fa-solid fa-star"></i> {parseFloat(vote_average).toFixed(1).replace(/\.0$/, '')}/10
          </span> 
          {first_air_date && (
            <span className="detail-meta-pill">
              <i className="fa-regular fa-calendar"></i> {first_air_date.substring(0, 4)}
            </span>
          )}
          <span className="detail-meta-pill">
           <i className="fa-solid fa-layer-group"></i> {number_of_seasons} {number_of_seasons === 1 ? 'Season' : 'Seasons'}
          </span>
          <span className="detail-meta-pill">
            <i className="fa-solid fa-clapperboard"></i> {number_of_episodes} {number_of_episodes === 1 ? 'Episode' : 'Episodes'}
          </span>
          {created_by?.length > 0 && (
            <span className="detail-meta-pill">
              <i className="fa-solid fa-user-pen"></i> {created_by.map((c) => c.name).join(", ")}
            </span>
          )}
        </div>

        <div className="detail-actions-panel">
          <Link to={`/player/${id}?e=1&s=1`} className="detail-action-btn detail-action-btn--primary">
            <i className="fa-solid fa-play"></i> Play S1 E1
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
            className={`tab-button ${activeTab === "seasons" ? "active" : ""}`}
            onClick={() => setActiveTab("seasons")}
          >
            Seasons
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "suggest" ? "active" : ""}`}
            onClick={() => setActiveTab("suggest")}
          >
            Recommendations
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "cast" ? "active" : ""}`}
            onClick={() => setActiveTab("cast")}
          >
            Cast
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        <div className="detail-tab-content">
          {activeTab === "seasons" && (
            <div>
              <div className="season-tab-buttons">
                {seasons?.map((season) => (
                  <button
                    type="button"
                    key={season.season_number}
                    className={`season-tab-button ${
                      seasonTab === `season${season.season_number}` ? "active" : ""
                    }`}
                    onClick={() => setSeasonTab(`season${season.season_number}`)}
                  >
                    Season {season.season_number}
                  </button>
                ))}
              </div>
              {seasons?.map((season) => (
                <div
                  key={`season${season.season_number}`}
                  style={{
                    display: seasonTab === `season${season.season_number}` ? "block" : "none",
                  }}
                >
                  <SeasonDetails tvShowId={id} seasonNumber={season.season_number} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "suggest" && (
            <div className="media-grid">
              {suggestedTvShows.slice(0, 8).map((tv) => (
                <MediaGridCard
                  key={tv.id}
                  item={tv}
                  linkTo={`/tv/${tv.id}`}
                />
              ))}
            </div>
          )}

          {activeTab === "cast" && (
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

          {activeTab === "reviews" && (
            <ul className="reviews-list">
              <div className="section-notice">
               <i className='fas fa-triangle-exclamation'></i> These reviews are provided by users of TMDB and do not reflect the views or opinions of this website. We do not endorse, verify, or reject any user-submitted reviews. Reviews may contain spoilers, opinions, or information that some viewers may find inaccurate or subjective.
              </div>

              {tvReviews.length === 0 ? (
                <li className="review"><p>No reviews yet.</p></li>
              ) : (
                tvReviews.map((review) => (
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

export default TvShowDetails;
