import React, { PropTypes } from 'react';
import classNames from 'classnames';


const Icon = ({className, name}) => {
  const cssClasses = classNames('material-icons', className);
  return <span className={cssClasses}>{name}</span>;
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Icon;
