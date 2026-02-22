import type { Metadata } from 'next'
import './global.css'

// ============================================================
// IMPORTS - Providers
// ============================================================
import { ThemeContextProvider } from "../providers/ThemeContext";
import ReCaptchaProvider from '@/providers/GoogleReCaptchaProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';


// ============================================================
// IMPORTS - UI Components
// ============================================================
import { NavBar, Footer } from '@/app/ui/barrel_files/components'


// ============================================================
// METADATA
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string), // ⚠️ cambiá por tu dominio
  title: {
    default: "Camilo Canclini Portfolio",
    template: "%s | Camilo Canclini",
  },
  description:
    "Portfolio de Camilo Canclini: proyectos reales con React/Next.js, .NET, Oracle PL/SQL, scraping y automatización.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Camilo Canclini Portfolio",
    description:
      "Proyectos con React/Next.js, .NET y Oracle. Casos reales, foco en performance y escalabilidad.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Portfolio de Camilo Canclini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camilo Canclini | Portfolio",
    description:
      "Proyectos con React/Next.js, .NET y Oracle. Casos reales, foco en performance y escalabilidad.",
    images: ["/og.png"],
  },
};


// ============================================================
//  LAYOUT
// ============================================================

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider defaultLocale="en">
          <ThemeContextProvider>
            <ReCaptchaProvider>
              <NavBar />
              {children}
              <Footer />
            </ReCaptchaProvider>
          </ThemeContextProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
