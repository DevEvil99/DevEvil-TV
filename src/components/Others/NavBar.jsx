import React, { useState } from 'react';
import '../../styles/NavBar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="left-side">
        <img src="assets/logo2.png" alt="Logo" className="logo" />
        <a href="/" className="navbar-link">Home</a>
        <a href="#movies" className="navbar-link">Movies</a>
        <a href="#tvshows" className="navbar-link">TV Shows</a>
        <a href="#categories" className="navbar-link">Categories</a>


        <div className="dropdown">
          <button className="dropbtn">Others <i className='fas fa-sort-down'></i></button>
          <div className="dropdown-content">
            <a href="#anime" className="navbar-link">Anime</a>
            <a href="#nowplaying" className="navbar-link">Now Playing</a>
            <a href="#trailers" className="navbar-link">Trailers</a>
            <a href="#performers" className="navbar-link">Popular Performers</a>
            <a href="#companies" className="navbar-link">Top Companies</a>
          </div>
        </div>

        <i className='fas fa-bars menu-icon' onClick={toggleMenu}></i>

      </div>
      <div className="right-side">
      <a href="search"><i className='fas fa-magnifying-glass search-icon'></i></a>
      <a className='signupbtn' href="https://devevil.com/users/signup" target='_blank noreferrer noopener'>Signup For DevEvil Universe</a>
        
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="/" className="navbar-link">Home</a>
        <a href="#movies" className="navbar-link">Movies</a>
        <a href="#tvshows" className="navbar-link">TV Shows</a>
        <a href="#categories" className="navbar-link">Categories</a>
          <a href="#anime" className="navbar-link">Anime</a>
          <a href="#nowplaying" className="navbar-link">Now Playing</a>
          <a href="#trailers" className="navbar-link">Trailers</a>
          <a href="#performers" className="navbar-link">Popular Performers</a>
          <a href="#companies" className="navbar-link">Top Companies</a>
        </div>
      )}

    </div>
  );
};

export default Navbar;
