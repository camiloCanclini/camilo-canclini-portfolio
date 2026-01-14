import type { Metadata } from 'next'
import ClientLayout from './ClientLayout'
// @ts-ignore
import './global.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Camilo Canclini Portfolio',
  description: 'Portfolio personal de Camilo Canclini',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}