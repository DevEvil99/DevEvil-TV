import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Banner from './components/Banner';
import MovieDetail from './components/MovieDetail';
import TvShowDetails from './components/TvShowDetails';
import Player from './components/Player';
import SearchPage from './components/SearchPage';
import NavBar from './components/Others/NavBar';
import UpcomingPage from './components/UpcomingPage';
import Privacy from './components/Others/NavSideFiles/Privacy';
import Terms from './components/Others/NavSideFiles/Terms';
import DMCA from './components/Others/NavSideFiles/DMCA';
import About from './components/Others/NavSideFiles/About';
import Categories from './components/Categories';
import TopActorsActresses from './components/TopActorsActresses';
import NowPlaying from './components/NowPlaying';
import Footer from './components/Others/Footer';
import Anime from './components/Anime';
import AnimeTv from './components/AnimeTv';
import MovieTrailers from './components/MovieTrailers';
import SideBtn from './components/Others/SideButtons';
import reportWebVitals from './reportWebVitals';
import './styles/root.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<React.Fragment><NavBar /><Banner /><SideBtn /><Movies /><TvShows /><Categories /><Anime /><AnimeTv /><NowPlaying /><MovieTrailers /><TopActorsActresses /><Footer /></React.Fragment>} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tv/:id" element={<TvShowDetails />} />
        <Route path="/player/:id" element={<Player/>} />
        <Route path="/player/:id?e=:episode&s=:season" element={<Player/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dmca" element={<DMCA />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
