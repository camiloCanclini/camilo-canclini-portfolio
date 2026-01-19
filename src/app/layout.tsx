import type { Metadata } from 'next'

import './global.css'
import { ThemeContextProvider } from "../providers/ThemeContext";
import ReCaptchaProvider from '@/providers/GoogleReCaptchaProvider';

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
          <ReCaptchaProvider>
            {children}
          </ReCaptchaProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
