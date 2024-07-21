import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import ThemeContext from "../utils/ThemeContext"

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  currentSubPagePath: string;
  tag?: string;
  onOlderPage: () => void;
  onNewerPage: () => void;
}

const StyledLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem 2rem;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.isDarkMode ? "#ffffff" : "#000000"};
  margin: 0 0.25rem;
  text-decoration: none;
  /* Styles for inactive links */
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    currentSubPagePath,
    tag,
    onOlderPage,
    onNewerPage,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const activeStyles: React.CSSProperties = {
      fontWeight: "bold",
      textDecoration: "none",
      color: isDarkMode ? "#9CE00C" : "#5200FF",
  }
  
  if(tag === undefined) {
    tag = ""
  }
    
return (
        <StyledLinkWrapper>
          <StyledLink
            to={`${currentSubPagePath}${tag}/1`}
            className={currentPage === 1 ? 'disabled' : ''}
            theme={{ isDarkMode }}
          >&lt;&lt;</StyledLink>
          <StyledLink
            to={currentPage === 1 ? `${currentSubPagePath}${tag}` : `${currentSubPagePath}${tag}/${currentPage - 1}`}
            onClick={currentPage === 1 ? undefined : onNewerPage}
            className={currentPage === 1 ? 'disabled' : ''}
            theme={{ isDarkMode }}
          >&lt;</StyledLink>
          {currentPage > 2 && (
            <StyledLink to={`${currentSubPagePath}${tag}/${currentPage - 2}`}
            theme={{ isDarkMode }}>
                {currentPage - 2}
            </StyledLink>
          )}
          {currentPage > 1 && (
            <StyledLink to={`${currentSubPagePath}${tag}/${currentPage - 1}`}
            theme={{ isDarkMode }}>
                {currentPage - 1}
            </StyledLink>
          )}
          <StyledLink
            to={`${currentSubPagePath}${tag}/${currentPage}`}
            style={activeStyles}
            theme={{ isDarkMode }}
          >
            {currentPage}
          </StyledLink>
          {currentPage < totalPages  && (
            <StyledLink to={`${currentSubPagePath}${tag}/${currentPage + 1}`}
            theme={{ isDarkMode }}>
                {currentPage + 1}
            </StyledLink>
          )}
          {currentPage < totalPages - 1 && (
            <StyledLink to={`${currentSubPagePath}${tag}/${currentPage + 2}`}
            theme={{ isDarkMode }}>
                {currentPage + 2}
            </StyledLink>
          )}
          <StyledLink
            to={`${currentSubPagePath}${tag}/${currentPage + 1}`}
            onClick={currentPage === totalPages ? undefined : onOlderPage}
            className={currentPage === totalPages ? 'disabled' : ''}
            theme={{ isDarkMode }}
          >&gt;</StyledLink>
          <StyledLink
            to={`${currentSubPagePath}${tag}/${totalPages}`}
            className={currentPage === totalPages ? 'disabled' : ''}
            theme={{ isDarkMode }}
          >&gt;&gt;</StyledLink>
      </StyledLinkWrapper>
    )
}

export default Pagination