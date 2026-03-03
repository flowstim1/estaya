export const metadata = {
  title: 'ESTAYA',
  description: 'Luxury Real Estate in Morocco',
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
