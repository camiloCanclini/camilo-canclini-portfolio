'use client'

import { useState, useEffect } from 'react';
import HomeScreen from '@/screens/home_screen/HomeScreen'
import LoadingScreen from '@/screens/loading_screen/LoadingScreen';
import jsonData from '@/config_files/projects.json';

export interface PreloadedImageInterface {
  src: string;
  element: HTMLImageElement;
}

export default function Page() {

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

  return (
    <>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <HomeScreen />
      )}
    </>
  )
}