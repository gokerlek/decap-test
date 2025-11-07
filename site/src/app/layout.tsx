import './globals.css'
import { ReactNode } from 'react'
import PageTransition from './ui/PageTransition'
import Nav from './ui/Nav'

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Agency',
  description: 'Fast static agency site with animations',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Nav />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <PageTransition>{children}</PageTransition>
        </main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-black/60">
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || 'Agency'}
        </footer>
      </body>
    </html>
  )
}
