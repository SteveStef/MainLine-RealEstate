import { Inter, Merriweather } from 'next/font/google';
import './globals.css'
import Link from 'next/link'
import { Home } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ['latin'], variable: '--font-merriweather' })

export const metadata = {
  title: 'Main Line Realty Blog',
  description: 'Insights and trends in Main Line real estate',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans">
        <div className="flex flex-col min-h-screen">
          <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200">
            <Link className="flex items-center justify-center" href="/">
              <Home className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-bold">Main Line Realty</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/">
                Home
              </Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/properties">
                Properties
              </Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/blog/1">
                Blog
              </Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="/contact">
                Contact
              </Link>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm text-gray-600">© 2024 Main Line Realty. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
