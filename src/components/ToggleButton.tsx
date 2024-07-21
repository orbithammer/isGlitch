import { useContext } from 'react';
import ThemeContext from '../utils/ThemeContext';
import styled from 'styled-components';

type ToggleButtonProps = {
    $isDarkMode: boolean;
  }

const ToggleButtonContainer = styled.div<ToggleButtonProps>`
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

const ToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButtonContainer $isDarkMode={isDarkMode} onClick={toggleTheme}>
      <ToggleButtonInner $isDarkMode={isDarkMode} />
    </ToggleButtonContainer>
  );
};

export default ToggleButton;