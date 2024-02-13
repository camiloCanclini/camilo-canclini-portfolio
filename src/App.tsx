import React, { useState, useEffect } from 'react';
import { ThemeContextProvider } from './ThemeContext'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/loading_screen/LoadingScreen';

function App() {
  const timeLoading = 3000;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, timeLoading);
  }, []);

  return (
    <>
      <ThemeContextProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <HomeScreen />
      )}
      </ThemeContextProvider>
    </>
  )
}

export default App
