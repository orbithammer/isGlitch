import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components"
import { ChevronDown, ChevronUp } from 'lucide-react';
import sidebarCloseIcon from "../assets/sidebarCloseIcon.svg?inline"
import ToggleButton from './ToggleButton';
import { articlesData } from "../data/articles";

const StyledSidebarWrapper = styled.div`
  z-index: 1;
`

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: start;
`

const StyledCloseButton = styled.button`
  height: 2rem;
  width: 2rem;
  background-color: #5200FF;
  border: none;
  margin: 0 1rem 0 auto;
`

const StyledCloseImg = styled.img`
  height: 2rem;
  width: 2rem;
`

const StyledUnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`

const StyledNavLinkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StyledDropdownIcon = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
`

const StyledDropdownMenu = styled.ul`
  list-style-type: none;
  padding-left: 1rem;
  margin-top: 0.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;

  &.open {
    max-height: 500px; // Adjust this value based on your needs
  }
`

const StyledDropdownItem = styled(NavLink)`
  text-decoration: none;
  font-size: 1.5rem;
  color: #ccc;
  display: block;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;

  &.open {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    color: #9CE00C;
  }
`

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categoryTags, setCategoryTags] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const tags = getCategoryTags();
    setCategoryTags(tags);
  }, []);

  const activeStyles: React.CSSProperties = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#9CE00C"
  }

  const sidebarStyles: React.CSSProperties = {
    position: 'fixed' as 'fixed',
    top: 0,
    right: -16,
    width: '21.5rem',
    height: '100vh',
    backgroundColor: '#5200FF',
    padding: '1.25rem',
    transform: 'translateX(23rem)',
    transition: 'transform 0.1s ease-out',
  };

  const sidebarOpen: React.CSSProperties = {
    ...sidebarStyles,
    transform: 'translateX(0)',
  };

  const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => 
    isActive ? activeStyles : undefined;

  const handleDropdownToggle = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === category ? null : category);
  }

  const getNavLinkPath = (item: string) => {
    return item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
  }

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
  }

  return (
    <StyledSidebarWrapper 
      style={isOpen ? sidebarOpen : sidebarStyles}
      onClick={(e) => e.stopPropagation()}
    >
      <StyledSearchWrapper>
        <ToggleButton />
        <StyledCloseButton onClick={toggleSidebar}>
          <StyledCloseImg src={sidebarCloseIcon} alt="sidebar close button icon"/>
        </StyledCloseButton>
      </StyledSearchWrapper>
      <StyledUnorderedList>
        {['Home', 'Tech', 'Reviews', 'Entertainment', 'AI'].map((item) => (
          <li key={item}>
            <StyledNavLink 
              to={getNavLinkPath(item)}
              style={getNavLinkStyle}
              onClick={toggleSidebar}
              aria-label={`to ${item.toLowerCase() === 'home' ? 'home' : item.toLowerCase()} page`}
            >
              <StyledNavLinkContent>
                {item}
                <StyledDropdownIcon onClick={(e) => handleDropdownToggle(e, item.toLowerCase())}>
                  {openDropdown === item.toLowerCase() ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </StyledDropdownIcon>
              </StyledNavLinkContent>
            </StyledNavLink>
            <StyledDropdownMenu className={openDropdown === item.toLowerCase() ? 'open' : ''}>
              {categoryTags[item.toLowerCase()]?.map((tag, index) => (
                <li key={tag}>
                  <StyledDropdownItem 
                    to={`/search/${tag}`}
                    onClick={toggleSidebar}
                    className={openDropdown === item.toLowerCase() ? 'open' : ''}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {tag}
                  </StyledDropdownItem>
                </li>
              ))}
            </StyledDropdownMenu>
          </li>
        ))}
        <li>
          <StyledNavLink 
            to="/contact"
            style={getNavLinkStyle}
            onClick={toggleSidebar}
            aria-label={`to contact us page`}
          >
            Contact Us
          </StyledNavLink>
        </li>
      </StyledUnorderedList>
    </StyledSidebarWrapper>
  );
};

export default Sidebar;