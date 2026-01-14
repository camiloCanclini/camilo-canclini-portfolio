'use client'

import { ThemeContextProvider } from '@/providers/ThemeContext'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  )
}