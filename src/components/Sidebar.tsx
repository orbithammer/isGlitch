import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components"
import sidebarCloseIcon from "../assets/sidebarCloseIcon.svg?inline"
import ToggleButton from './ToggleButton';

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
`
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
`

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
    isOpen,
    toggleSidebar,
  }) => {
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

return (
    <StyledSidebarWrapper 
      style={isOpen ? sidebarOpen : sidebarStyles}
      onClick={toggleSidebar}
    >
      <StyledSearchWrapper>
      <ToggleButton />
        <StyledCloseButton onClick={toggleSidebar}>
          <StyledCloseImg src={sidebarCloseIcon} alt="sidebar close button icon"/>
        </StyledCloseButton>
      </StyledSearchWrapper>
      <StyledUnorderedList>
        <li>
        <StyledNavLink 
          to="/"
          style={getNavLinkStyle}
          onClick={toggleSidebar}
          aria-label={`to home page`}
          >Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink 
          to="/tech"
          style={getNavLinkStyle}
          onClick={toggleSidebar}
          aria-label={`to tech page`}
          >Tech</StyledNavLink>
        </li>
        <li>
          <StyledNavLink 
          to="/reviews"
          style={getNavLinkStyle}
          onClick={toggleSidebar}
          aria-label={`to reviews page`}
          >Reviews</StyledNavLink>
        </li>
        <li>
          <StyledNavLink 
          to="/entertainment"
          style={getNavLinkStyle}
          onClick={toggleSidebar}
          aria-label={`to entertainment page`}
          >Entertainment</StyledNavLink>
        </li>
        <li>
          <StyledNavLink 
          to="/ai"
          style={getNavLinkStyle}
          onClick={toggleSidebar}
          aria-label={`to ai page`}
          >AI</StyledNavLink>
        </li>
        <li>
          <StyledNavLink 
          to="/contact"
          style={getNavLinkStyle}
          onClick={toggleSidebar}
          aria-label={`to contact us page`}
          >Contact Us</StyledNavLink>
        </li>
      </StyledUnorderedList>
    </StyledSidebarWrapper>
  );
};

export default Sidebar;