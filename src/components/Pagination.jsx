import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, onPageChange }) => (
  <div className="section-pagination">
    <button
      type="button"
      className="section-pagination__btn"
      onClick={() => onPageChange('prev')}
      disabled={currentPage <= 1}
      aria-label="Previous page"
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>
    <span className="section-pagination__current">{currentPage}</span>
    <button
      type="button"
      className="section-pagination__btn"
      onClick={() => onPageChange('next')}
      aria-label="Next page"
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
