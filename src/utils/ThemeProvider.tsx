import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import getPreferredTheme from './getPreferredTheme';

type ThemeProviderProps = {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getPreferredTheme()) || useState(true);
  const rootElement = document.documentElement;
  if (isDarkMode) { 
    rootElement.style.setProperty('--background-color', '#131313');
  } else {
    rootElement.style.setProperty('--background-color', '#f5f5f5');
  }
  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode }}>
      <div className={isDarkMode ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider