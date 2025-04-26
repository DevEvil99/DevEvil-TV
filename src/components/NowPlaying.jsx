import React, { useState, useEffect } from 'react';
import { getNowPlayingMovies } from '../services/tmdbService';
import { Link } from "react-router-dom";
import '../styles/NowPlaying.css'

const NowPlaying = () => {
	const [trendingMovies, setTrendingMovies] = useState([]);

	useEffect(() => {
const fetchTrendingMovies = async () => {
		try {
 const movies = await getNowPlayingMovies();
  setTrendingMovies(movies.slice(0, 20));
		} catch (error) {
 // Handle error
  console.error('Error fetching trending movies:', error);
		}
 };
  
fetchTrendingMovies();
	}, []);

	return (
		<section className="live" id="nowplaying">
      <div id="frame" style={{ width: "100%" }}>
  <iframe
    data-aa="2336504"
    src="//acceptable.a-ads.com/2336504"
    style={{
      border: "0px",
      padding: "0",
      width: "100%",
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

    <div className="filter-bar">
      <h1>Now Playing Movies <i className="fa-solid fa-circle-small fa-beat-fade" style={{color:'#ca1212'}}></i></h1>
        </div>
  <div className="live-grid">
  {trendingMovies.map((movie) => (
	<Link to={`/movie/${movie.id}`} key={movie.id}>
    <div className="live-card">
      <div className="category-card">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="card-img" />
		<h3 className="name">{movie.title}</h3>

    <div className="card-overlay">
                  <div className="play">
                  <i style={{fontSize:"50px"}} className="play-circle-outline fa-solid fa-circle-play"></i>
                  </div>
                </div>
      </div>

    </div>
	</Link>
 ))}
  </div>

</section>


	);
  };

export default NowPlaying;
