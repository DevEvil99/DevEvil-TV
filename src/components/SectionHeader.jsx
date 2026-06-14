import React from 'react';
import PropTypes from 'prop-types';

const SectionHeader = ({ title, icon, children, variant = 'default' }) => (
  <div className={`section-header section-header--${variant}`}>
    <h2 className="section-header__title">
      {title} {icon && <i className={icon}></i>}
    </h2>
    {children && <div className="section-header__controls">{children}</div>}
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'notice']),
};

export default SectionHeader;
