import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false, label = 'Loading' }) => (
  <div className={`loading-spinner-wrap ${fullScreen ? 'loading-spinner-wrap--fullscreen' : ''}`}>
    <div className="loading-spinner" role="status" aria-label={label}>
      <div className="loading-spinner-ring"></div>
      <div className="loading-spinner-ring loading-spinner-ring--delay"></div>
    </div>
    {label && <p className="loading-spinner-label">{label}</p>}
  </div>
);

LoadingSpinner.propTypes = {
  fullScreen: PropTypes.bool,
  label: PropTypes.string,
};

export default LoadingSpinner;
