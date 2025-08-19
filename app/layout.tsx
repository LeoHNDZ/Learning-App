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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}