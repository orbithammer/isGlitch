import { useContext } from 'react';
import ThemeContext from '../utils/ThemeContext';
import styled from 'styled-components';
// import { ReactComponent as SunIcon } from "../assets/sun.svg"
// import { ReactComponent as MoonIcon } from "../assets/moon.svg"

type ToggleButtonProps = {
    $isDarkMode: boolean;
  }

const ToggleButtonContainer = styled.div<ToggleButtonProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 4rem;
  height: 2rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#333' : '#ddd')};
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
`;

const ToggleButtonInner = styled.div<ToggleButtonProps>`
  position: absolute;
  top: 0.2rem;
  left: ${({ $isDarkMode }) => ($isDarkMode ? '2rem' : '0.2rem')};
  width: 1.6rem;
  height: 1.6rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: left 0.2s ease-out;
`;

const IconWrapper = styled.div<ToggleButtonProps>`
  position: absolute;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${({ $isDarkMode }) => ($isDarkMode ? '0.4rem' : '2.4rem')};
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SunIcon = () => (
  
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="90px" height="90px">    <path fill="#ffffff" d="M 14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2 L 14 5 A 1.0001 1.0001 0 1 0 16 5 L 16 2 A 1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625 L 7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562 L 6.515625 5.1015625 A 1.0001 1.0001 0 0 0 5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625 L 21.363281 7.2226562 A 1.0001 1.0001 0 1 0 22.777344 8.6367188 L 24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z M 15 8 A 7 7 0 0 0 8 15 A 7 7 0 0 0 15 22 A 7 7 0 0 0 22 15 A 7 7 0 0 0 15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16 L 5 16 A 1.0001 1.0001 0 1 0 5 14 L 2 14 z M 25 14 A 1.0001 1.0001 0 1 0 25 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 21.363281 L 5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438 L 8.6367188 22.777344 A 1.0001 1.0001 0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344 L 23.484375 24.898438 A 1.0001 1.0001 0 1 0 24.898438 23.484375 L 22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 23.986328 A 1.0001 1.0001 0 0 0 14 25 L 14 28 A 1.0001 1.0001 0 1 0 16 28 L 16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z"/></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/>
  </svg>
);

const ToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButtonContainer $isDarkMode={isDarkMode} onClick={toggleTheme}>
      <IconWrapper $isDarkMode={isDarkMode}>
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </IconWrapper>
      <ToggleButtonInner $isDarkMode={isDarkMode} />
    </ToggleButtonContainer>
  );
};

export default ToggleButton;