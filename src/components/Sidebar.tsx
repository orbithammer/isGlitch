import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import sidebarCloseIcon from "../assets/sidebarCloseIcon.svg?inline"
import ToggleButton from './ToggleButton';
import { articlesData } from "../data/articles";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categoryTags, setCategoryTags] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const tags = getCategoryTags();
    setCategoryTags(tags);
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const getNavLinkPath = (item: string) => {
    return item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
  };

  const getCategoryTags = () => {
    const categories = ['home', 'tech', 'reviews', 'entertainment', 'ai'];
    const tags: Record<string, Record<string, number>> = {};

    categories.forEach(category => {
      tags[category] = {};
      articlesData.forEach(article => {
        if (category === 'home' || article.category === category) {
          article.tags.forEach(tag => {
            tags[category][tag] = (tags[category][tag] || 0) + 1;
          });
        }
      });
    });

    const topTags: Record<string, string[]> = {};
    Object.entries(tags).forEach(([category, categoryTags]) => {
      topTags[category] = Object.entries(categoryTags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag]) => tag);
    });

    return topTags;
  };

  return (
    <div 
      className={`sidebar-wrapper ${isOpen ? 'open' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="search-wrapper">
        <ToggleButton />
        <button className="close-button" onClick={toggleSidebar}>
          <img className="close-icon" src={sidebarCloseIcon} alt="sidebar close button icon"/>
        </button>
      </div>
      <ul className="nav-list">
        {['Home', 'Tech', 'Reviews', 'Entertainment', 'AI'].map((item) => (
          <li key={item}>
            <NavLink 
              to={getNavLinkPath(item)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={toggleSidebar}
              aria-label={`to ${item.toLowerCase() === 'home' ? 'home' : item.toLowerCase()} page`}
            >
              <div className="nav-link-content">
                {item}
                <span 
                  className="dropdown-icon"
                  onClick={(e) => handleDropdownToggle(e, item.toLowerCase())}
                >
                  {openDropdown === item.toLowerCase() ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </span>
              </div>
            </NavLink>
            <ul className={`dropdown-menu ${openDropdown === item.toLowerCase() ? 'open' : ''}`}>
              {categoryTags[item.toLowerCase()]?.map((tag, index) => (
                <li key={tag}>
                  <NavLink 
                    to={`/search/${tag}`}
                    onClick={toggleSidebar}
                    className={`dropdown-item ${openDropdown === item.toLowerCase() ? 'open' : ''}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {tag}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li>
          <NavLink 
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={toggleSidebar}
            aria-label="to contact us page"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;