import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'

const Nunito = Nunito_Sans({weight: '500',  subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Sci-Fi pizza ordering',
  description: 'A fake Pizza ordering website from extra-terrestrial life. This is a portfolio project. There are no pizzas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Nunito.className}>{children}</body>
    </html>
  )
}
