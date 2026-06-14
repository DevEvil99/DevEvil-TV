import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Others/NavBar';
import Footer from './Others/Footer';
import '../styles/NotFound.css';

const NotFound = () => (
  <>
    <NavBar />
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="not-found-btn">
          <i className="fa-solid fa-home"></i> Back to Home
        </Link>
      </div>
    </div>
    <Footer />
  </>
);

export default NotFound;
