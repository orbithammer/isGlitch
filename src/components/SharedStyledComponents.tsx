import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => (theme.isDarkMode ? "#ffffff" : "#000000")};
  padding: 0 auto;
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  margin: 0 auto;
`;

export const StyledLogo = styled.h1`
  position: absolute;
  font-size: 3rem;
  text-shadow: ${({ theme }) =>
    theme.isDarkMode
      ? "1px 1px 5px rgba(0, 0, 0, 0.5)"
      : "1px 1px 5px rgba(255, 255, 255, 0.5)"};
  top: -4.6rem;
  left: -0.6rem;
  @media (min-width: 64rem) {
    font-size: 4rem;
    top: -6.3rem;
    left: -0.8rem;
  }
`;

export const StyledImg = styled.img`
  max-width: 100%;
  margin: 0;
  border-radius: 5px;
  object-fit: cover;
`;

export const StyledHeadline = styled.h2`
  font-family: "Fjalla One", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2.4rem;
  letter-spacing: -0.05em;
  max-width: 90%;
  word-spacing: -0.05em;
  line-height: 1.2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) =>
      theme.isDarkMode ? "#5200FF" : "#9CE00C"};
  }
  margin: 0 0 0.5rem;
  @media (min-width: 64rem) {
    font-size: 3rem;
    line-height: 1.13;
  }
`;

export const StyledSubhead = styled.p`
  font-family: "Source Serif 4", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 1.5rem;
  letter-spacing: -0.05em;
  word-spacing: -0.05em;
  margin: 0;
  padding: 0 1rem;
  line-height: 1.07;
`;

export const StyledHeadlineSmall = styled(StyledHeadline)`
  font-size: 2rem;
  line-height: 1.25;
  @media (min-width: 64rem) {
    font-size: 2.4rem;
  }
`;

export const StyledSubheadSmall = styled(StyledSubhead)`
  font-size: 1rem;
  line-height: 1;
  letter-spacing: -0.02em;
  @media (min-width: 64rem) {
    font-size: 1.2rem;
    line-height: 0.83;
  }
`;

export const StyledArticleInfo = styled.p`
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-transform: uppercase;
  padding: 0 0.5rem;
`;

export const StyledAuthor = styled(Link)`
  color: ${({ theme }) => (theme.isDarkMode ? "#9CE00C" : "#5200FF")};
  margin-right: 0.3rem;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) =>
      theme.isDarkMode ? "#5200FF" : "#9CE00C"};
  }
`;