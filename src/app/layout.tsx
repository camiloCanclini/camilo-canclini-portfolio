import type { Metadata } from 'next'

import './global.css'
import { ThemeContextProvider } from "../providers/ThemeContext";

export const metadata: Metadata = {
  title: 'Camilo Canclini Portfolio',
  description: 'Portfolio personal de Camilo Canclini',
}

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeContextProvider>
          {children}    
        </ThemeContextProvider>
      </body>
    </html>
  );
}
