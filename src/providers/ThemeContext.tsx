/* eslint-disable @typescript-eslint/no-explicit-any */
// ThemeContext.tsx
"use client"
import React from 'react';
import { ThemeProvider } from "next-themes";

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  
return (
    <ThemeProvider
      attribute="class"       // pone "dark" en <html> o <body>
      defaultTheme="dark"   // 👈 por defecto oscuro
      enableSystem={false}  // 👈 opcional: no seguir el sistema
    >
      {children}
    </ThemeProvider>
  );
};
