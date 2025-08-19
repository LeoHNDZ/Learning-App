import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata = {
  title: 'Studio Learning App',
  description: 'Learn how the LeoHNDZ/studio repository works',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}