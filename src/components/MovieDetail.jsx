import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getMovieDetails, getMovieTrailer, getMovieRecommendations, getMovieReviews } from "../services/tmdbService";
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
      } catch (error) {
        // Handle error
      }
    };

    const fetchSuggestedMovies = async () => {
      try {
        const recommendations = await getMovieRecommendations(id);
        setSuggestedMovies(recommendations.results);
      } catch (error) {
        // Handle error
      }
    };

    fetchMovieDetails();
    if (activeTab === 'suggested') {
      fetchSuggestedMovies();
    }
  }, [id, activeTab]);

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  const {
    title,
    release_date,
    runtime,
    genres,
    overview,
    vote_average,
    budget,
    revenue,
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

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
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
        <p>
          {genres.map((genre) => (
            <span key={genre.id} className="genre">
              {genre.name}
            </span>
          ))}{" "}
          <span className="date">{release_date}</span>{" "}
          <span className="dot">•</span>{" "}
          <span className="time">{formatTime(runtime)}</span>{" "}
          <span className="dot">•</span>{" "}
          <span className="rating">
            User Score: {Math.round(vote_average * 10)}%
          </span>{" "}
          <span className="dot">•</span>{" "}
          <span className="budget">Budget: {formatCurrency(budget)}</span>{" "}
          <span className="dot">•</span>{" "}
          <span className="revenue">Revenue: {formatCurrency(revenue)}</span>
        </p>

        <div className="media-actions">
          <Link to={`/player/${id}`}>
            <button className="primary">
              <i className="fa-solid fa-play"></i>
              <p>Play</p>
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
            alt={`${title} Logo`}
            draggable={'false'}
          />
          
        </div>
      )}

<div id="frame" style={{ width: "350px" }}>
  <iframe
    data-aa="2336504"
    src="//acceptable.a-ads.com/2336504"
    style={{
      border: "0px",
      padding: "0",
      width: "350px",
      height: "100%",
      overflow: "hidden",
      backgroundColor: "transparent"
    }}
  ></iframe>
  <a
    style={{
      display: "block",
      textAlign: "right",
      fontSize: "12px"
    }}
    id="frame-link"
    href="https://a-ads.com/?partner=2336504"
  >
    Advertise here
  </a>
</div>


          {/* Add your existing Play button logic here */}
        </div>

        <p className="overview">{overview}</p>

        <div className="tab-section">
          <button
            className={`tab-button ${activeTab === "suggested" ? "active" : ""}`}
            onClick={() => toggleTab("suggested")}
          >
            Recommendations
          </button>
          <button
            className={`tab-button ${activeTab === "cast" ? "active" : ""}`}
            onClick={() => toggleTab("cast")}
          >
            Top Billed Cast
          </button>
          <button
  className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
  onClick={() => toggleTab('reviews')}
>
Users Reviews
</button>
        </div>

        {activeTab === "suggested" && (
          <div>
            <div className="castul">

              {suggestedMovies.slice(0, 8).map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div>
                  <img
                  className="cast-poster"
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title}
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
      {movieReviews.map((review) => (
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

export default MovieDetails;
