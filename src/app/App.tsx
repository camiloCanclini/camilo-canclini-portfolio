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
  
  const preloadImages = (projects: any[]): Promise<PromiseSettledResult<void>[]> => {
    return Promise.allSettled(
      projects.map((project, index) => {
        return new Promise<void>((resolve, reject) => {
          const url = project.placeholderImage;
          if (!url) {
            reject(new Error(`Image URL is undefined for project: ${project.title}`));
            return;
          }
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url} for project: ${project.title}`));
        });
      })
    );
  };

  

   useEffect(() => {
    preloadImages(jsonData)
      .then((results) => {
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(result.reason.message);
          }
        });
        setIsLoading(false);
      });
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
