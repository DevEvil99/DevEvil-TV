import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const browseLinks = [
  { to: '/shorts', label: 'Shorts', isRoute: true },
  { href: '/#movies', label: 'Movies' },
  { href: '/#tvshows', label: 'TV Shows' },
  { href: '/#categories', label: 'Categories' },
  { href: '/#anime', label: 'Anime' },
  { to: '/my-list', label: 'My List', isRoute: true },
];

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/dmca', label: 'DMCA' },
];

const socialLinks = [
  { href: '', icon: 'fas fa-globe', label: 'Website' },
  { href: '', icon: 'fab fa-discord', label: 'Discord' },
  { href: '', icon: 'fab fa-github', label: 'GitHub' },
  { href: '', icon: 'fab fa-instagram', label: 'Instagram' },
  { href: '', icon: 'fab fa-x-twitter', label: 'X' },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__glow"></div>

    <div className="site-footer__main">
      <div className="site-footer__brand">
        <Link to="/" className="site-footer__logo-link">
          <img src="/assets/logo2.png" alt="Logo" className="site-footer__logo" />
        </Link>
        <p className="site-footer__tagline">
          DevEvil TV is a free, and open-source streaming website. No account required — just pick something and watch.
        </p>
        <div className="site-footer__social">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="site-footer__social-btn"
              aria-label={item.label}
            >
              <i className={item.icon}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="site-footer__columns">
        <div className="site-footer__col">
          <h4>Browse</h4>
          <ul>
            {browseLinks.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link to={link.to}>{link.label}</Link>
                ) : (
                  <a href={link.href}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Important</h4>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Community</h4>
          <ul>
            <li><a href="" target="_blank" rel="noreferrer">Contact</a></li>
            <li><a href="" target="_blank" rel="noreferrer">Discord Server</a></li>
            <li>
              <a href="https://github.com/DevEvil99/DevEvil-TV" target="_blank" rel="noreferrer">
                Source Code
              </a>
            </li>
          </ul>
          <p className="site-footer__note">
            <i className="fa-solid fa-circle-info"></i> Please disable your ad blocker for the best experience.
          </p>
        </div>
      </div>
    </div>

    <div className="site-footer__bottom">
      <p>© {new Date().getFullYear()} DevEvil Universe & DevEvil TV. All rights reserved. <br /> All trademarks, logos, images, and content belong to their respective owners.</p>
      <p className="site-footer__credit">
        Made with <span><i className='fas fa-heart footer-icon'></i></span> using React, TMDB API, <span><i className='fas fa-brain footer-icon'></i></span> & <span><i className='fas fa-coffee footer-icon'></i></span>
      </p>
      <span className="site-footer__version"><a href="https://blog.devevil.com/devevil-tv-version-3-is-out" target="_blank" rel="noreferrer" style={{color: 'var(--sec)'}}>v3.0</a></span>
    </div>
  </footer>
);

export default Footer;
