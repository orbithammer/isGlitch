import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const CustomLink: React.FC<LinkProps> = ({ children, to, ...props }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;