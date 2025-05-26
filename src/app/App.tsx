import React, { useState, useEffect } from 'react';
import { ThemeContextProvider } from '@/providers/ThemeContext'
import './App.css'
import HomeScreen from  '@/screens/home_screen/HomeScreen'
import LoadingScreen from '@/screens/loading_screen/LoadingScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jsonData from '@config_files/projects.json';
import { ProjectCardInterface } from '@/components/home_screen/sections/projects/project_card/ProjectCard';

export interface PreloadedImageInterface {
  src: string;
  element: HTMLImageElement;
}

const App: React.FC = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const imageUrls: string[] = jsonData.map((elem) => elem.placeholderImage)

  const preloadImages = (imageUrls: string[]): Promise<void[]> => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = reject;
        });
      })
    );
  };

  

   useEffect(() => {
    preloadImages(imageUrls)
      .then(() => setIsLoading(false))
      .catch((error) => console.error("Error loading images", error));
  }, []);

  /* useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, []) */
  

  return (
    <ThemeContextProvider>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<HomeScreen />}
            />
            {/* <Route path="/projects/:id" element={<ProjectScreen />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      )}
    </ThemeContextProvider>
  )
}

export default App
