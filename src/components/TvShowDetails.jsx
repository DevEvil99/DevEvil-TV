import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getTvShowDetails,
  getTvRecommendations,
  getTvReviews,
  getTvTrailer
} from "../services/tmdbService";
import SeasonDetails from "./TV/SeasonDetails";
import "../styles/TvShowDetails.css";


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

      } catch (error) {
        // Handle error
      }
    };

    const fetchSuggestedTvShows = async () => {
      try {
        const recommendations = await getTvRecommendations(id);
        setSuggestedTvShows(recommendations.results);
      } catch (error) {
        // Handle error
      }
    };

    fetchTvShowDetails(); 

    if (activeTab === "suggest") {
      fetchSuggestedTvShows(); 
    }
  }, [id, activeTab]);

  if (!tvShowDetails) {
    return <div>Loading...</div>;
  }

  const {
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



  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const toggleSeasonTab = (seasonNumber) => {
    setSeasonTab(`season${seasonNumber}`);
  };

  return (
    <div>


      <div
        className="banner-details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
      ></div>

      <div className="media-content">
        <p className="tagline">{tagline}</p>
        <div className="details">

          {genres && Array.isArray(genres) && (
            <p>
              {genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}{" "}
              <span className="date">{first_air_date}</span>{" "}
              <span className="dot">•</span>{" "}
              <span className="date">{Math.round(vote_average * 10)}%</span>{" "}
              <span className="dot">•</span>{" "}
              <span className="date">{number_of_seasons} Seasons</span>{" "}
              <span className="dot">•</span>{" "}
              <span className="date">{number_of_episodes} Episodes</span>
              <span className="dot">•</span>
              <span className="date">
                Created By:{" "}
                {created_by.map((creator) => creator.name).join(", ")}
              </span>
            </p>
          )}

<div className="media-actions">
          <Link to={`/player/${id}?e=1&s=1`}>
            <button className="primary">
              <i className="fa-solid fa-play"></i>
              <p>Play Season 1 Episode 1</p>
            </button>
          </Link>

          {trailerKey && (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="secondary">
                <i className="fa-solid fa-popcorn"></i>
                <p>Watch Trailer</p>
              </button>
            </a>
          )}

{images && images.logos && images.logos.length > 0 && (
            <div className="logo-container">
              <img
                src={`https://image.tmdb.org/t/p/original/${images.logos[0].file_path}`}
                draggable={"false"}
              />
            </div>
          )}

        </div>

          <p className="overview">{overview}</p>

          
        </div>


        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "seasons" ? "active" : ""}`}
            onClick={() => toggleTab("seasons")}
          >
            Seasons
          </button>

          <button
            className={`tab-button ${activeTab === "suggest" ? "active" : ""}`}
            onClick={() => toggleTab("suggest")}
          >
            Recommendations
          </button>

          <button
            className={`tab-button ${activeTab === "cast" ? "active" : ""}`}
            onClick={() => toggleTab("cast")}
          >
            Series Cast
          </button>

          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => toggleTab("reviews")}
          >
            Users Reviews
          </button>
        </div>

        {activeTab === "seasons" && (
          <div>

            <div className="season-tab-buttons">
              {seasons &&
                seasons.map((season) => (
                  <button
                    key={season.season_number}
                    className={`season-tab-button ${
                      seasonTab === `season${season.season_number}`
                        ? "active"
                        : ""
                    }`}
                    onClick={() => toggleSeasonTab(season.season_number)}
                  >
                    Season {season.season_number}
                  </button>
                ))}
            </div>

            {seasons &&
              seasons.map((season) => (
                <div
                  key={`season${season.season_number}`}
                  style={{
                    display:
                      seasonTab === `season${season.season_number}`
                        ? "block"
                        : "none",
                  }}
                >
                  <SeasonDetails
                    tvShowId={id}
                    seasonNumber={season.season_number}
                  />
                </div>
              ))}
          </div>
        )}

{activeTab === "suggest" && (
        <div>
          <div className="castul">
            {suggestedTvShows.slice(0, 8).map((tv) => (
              <Link to={`/tv/${tv.id}`} key={tv.id}>
                <div>
                  <img
                  style={{marginLeft:'15px'}}
                    className="cast-poster"
                    src={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`}
                    alt={tv.title}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}


        {activeTab === "cast" && (
          <div>
            <ul className="castul">
              {credits.cast.slice(0, 8).map((cast) => (
                <li key={cast.id}>
                  <img
                    className="cast-poster"
                    src={`https://image.tmdb.org/t/p/w1280/${cast.profile_path}`}
                    alt={cast.title || cast.name}
                    key={cast.id}
                    draggable="false"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}


{activeTab === 'reviews' && (
  <div>
    <ul className="reviews-list">
      {tvReviews.map((review) => (
        <li key={review.id} className="review">
          <p>
A review by {review.author}</p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  </div>
)}

      </div>

      
    </div>
  );
};

export default TvShowDetails;
