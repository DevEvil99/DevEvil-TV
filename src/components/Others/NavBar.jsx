import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import SearchOverlay from '../SearchOverlay';
import '../../styles/NavBar.css';

const primaryLinks = [
  { to: '/shorts', label: 'Shorts', isRoute: true },
  { href: '#movies', label: 'Movies' },
  { href: '#tvshows', label: 'TV Shows' },
  { href: '#categories', label: 'Categories' },
];

const otherLinks = [
  { href: '#anime', label: 'Anime' },
  { href: '#iranian', label: 'Iranian' },
  { href: '#turkish', label: 'Turkish' },
  { href: '#nowplaying', label: 'Now Playing' },
  { href: '#trailers', label: 'Trailers' },
  { href: '#performers', label: 'Popular Performers' },
  { href: '#companies', label: 'Top Companies' },
  { to: '/search', label: 'Search', isRoute: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { watchlist } = useWatchlist();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const showSolidBg = !isHome || scrolled || isMenuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const renderLink = (link) => {
    const className = 'navbar-link';
    if (link.isRoute) {
      return (
        <Link key={link.label} to={link.to} className={className} onClick={closeMenu}>
          {link.label}
        </Link>
      );
    }
    return (
      <a key={link.label} href={link.href} className={className} onClick={closeMenu}>
        {link.label}
      </a>
    );
  };

  return (
    <>
      <header
        className={[
          'navbar',
          isHome && 'navbar--hero',
          showSolidBg && 'navbar--scrolled',
          isMenuOpen && 'navbar--open',
        ].filter(Boolean).join(' ')}
      >
        <div className="navbar__inner">
          <div className="navbar__left">
            <Link to="/" className="navbar__logo" onClick={closeMenu}>
              <img src="assets/logo2.png" alt="Logo" className="logo" />
            </Link>

            <nav className="navbar__desktop" aria-label="Main navigation">
              {primaryLinks.map(renderLink)}
              <Link to="/my-list" className="navbar-link navbar-link--list">
                My List
                {watchlist.length > 0 && <span className="nav-badge">{watchlist.length}</span>}
              </Link>
              <div className="dropdown">
                <button type="button" className="dropbtn">
                  Others <i className="fas fa-chevron-down"></i>
                </button>
                <div className="dropdown-content">
                  {otherLinks.map(renderLink)}
                </div>
              </div>
            </nav>
          </div>

          <div className="navbar__right">
            <button
              type="button"
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <i className="fas fa-magnifying-glass"></i>
              <span className="search-trigger-hint">Search... (Ctrl+K)</span>
            </button>
            <a
              className="signupbtn"
              href="https://devevil.com/users/signup"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="signupbtn__full">Signup For DevEvil Universe</span>
              <span className="signupbtn__short">Sign Up</span>
            </a>
            <button
              type="button"
              className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
          <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
            {primaryLinks.map(renderLink)}
            <Link to="/my-list" className="navbar-link navbar-link--list" onClick={closeMenu}>
              My List
              {watchlist.length > 0 && <span className="nav-badge">{watchlist.length}</span>}
            </Link>
            <p className="navbar__mobile-label">More</p>
            {otherLinks.map(renderLink)}
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      )}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
