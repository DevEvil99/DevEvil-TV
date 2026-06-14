// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import { ContinueWatchingProvider } from './context/ContinueWatchingContext';
import { ToastProvider } from './context/ToastContext';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Banner from './components/Banner';
import MovieDetail from './components/MovieDetail';
import TvShowDetails from './components/TvShowDetails';
import Player from './components/Player';
import SearchPage from './components/SearchPage';
import NavBar from './components/Others/NavBar';
import DMCA from './components/Others/NavSideFiles/DMCA';
import About from './components/Others/NavSideFiles/About';
import Categories from './components/Categories';
import TopActorsActresses from './components/TopActorsActresses';
import TopCompanies from './components/TopCompanies';
import NowPlaying from './components/NowPlaying';
import Footer from './components/Others/Footer';
import Anime from './components/Anime';
import AnimeTv from './components/AnimeTv';
import Turkish from './components/Turkish';
import TurkishTv from './components/TurkishTv';
import Iranian from './components/Iranian';
import IranianTv from './components/IranianTv';
import MovieTrailers from './components/MovieTrailers';
import SideBtn from './components/Others/SideButtons';
import ContinueWatching from './components/ContinueWatching';
import MyList from './components/MyList';
import Shorts from './components/Shorts';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import './styles/root.css';

const HomePage = () => (
  <>
    <NavBar />
    <Banner />
    <SideBtn />
    <ContinueWatching />
    <Movies />
    <TvShows />
    <Categories />
    <Anime />
    <AnimeTv />
    <Iranian />
    <IranianTv />
    <Turkish />
    <TurkishTv />
    <NowPlaying />
    <MovieTrailers />
    <TopActorsActresses />
    <TopCompanies />
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WatchlistProvider>
      <ContinueWatchingProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/tv/:id" element={<TvShowDetails />} />
              <Route path="/player/:id" element={<Player />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/dmca" element={<DMCA />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ToastProvider>
      </ContinueWatchingProvider>
    </WatchlistProvider>
  </React.StrictMode>,
);

reportWebVitals();
