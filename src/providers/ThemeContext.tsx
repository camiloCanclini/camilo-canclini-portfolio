/* eslint-disable @typescript-eslint/no-explicit-any */
// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { darkTheme, lightTheme, Theme} from './Themes'

interface ThemeContextType {
  isDark: boolean;
  toggleThemeContext: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used inside of ThemeContextProvider');
  }
  return context;
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {

  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(darkTheme);

  const toggleThemeContext = () => {
    setIsDark(prev => {
      const nextIsDark = !prev;
      setTheme(nextIsDark ? darkTheme : lightTheme);
      return nextIsDark;
    });

    setTheme((isDark: Theme) => isDark ? darkTheme: lightTheme)
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleThemeContext, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};
