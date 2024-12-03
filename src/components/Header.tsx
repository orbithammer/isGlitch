import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import menuPlusDark from "../assets/menuPlusDark.svg?inline"
import menuPlusLight from "../assets/menuPlusLight.svg?inline"
import chevronUpDark from "../assets/chevronUpDark.svg"
import chevronUpLight from "../assets/chevronUpLight.svg"
import ThemeContext from "../utils/ThemeContext"

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/");
  const pathNameFirstSegment = segments[1];
  const pathNameUnformatted = pathNameFirstSegment === "search" 
    ? segments[2] 
    : pathNameFirstSegment === "thank-you" 
      ? "" : pathNameFirstSegment;
  const pageNameInitial = pathNameUnformatted === "ai" ? "AI" : decodeURIComponent(pathNameUnformatted).charAt(0).toUpperCase() + decodeURIComponent(pathNameUnformatted).slice(1);
  const hasOnlyNumber = /^\d+$/.test(pageNameInitial);
  const pageName = hasOnlyNumber ? "" : pageNameInitial;
  
  const toggleSidebar = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <p className="page-name">{pageName}</p>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <button 
              className="sidebar-button"
              onClick={toggleSidebar}
            >
              Menu
              <img 
                className="sidebar-icon"
                src={isDarkMode ? menuPlusDark : menuPlusLight} 
                alt="menu icon"
              />
            </button>
          </li>
        </ul>
      </nav>
      {!isOpen && (
        <button 
          className="scroll-to-top"
          onClick={scrollToTop}
        >
          <img 
            className="chevron-up-icon"
            src={isDarkMode ? chevronUpDark : chevronUpLight} 
            alt="up arrow"
          />
        </button>
      )}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default Header;