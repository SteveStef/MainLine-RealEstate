import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Home, Phone, Search } from 'lucide-react'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ['latin'], variable: '--font-merriweather' })

export const metadata = {
  title: 'Main Line Realty',
  description: 'Luxury real estate in the Main Line area',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <Link href="/" className="flex items-center space-x-3">
                  <Home />
                  <span className="text-xl font-bold text-gray-800 font-serif">Main Line Realty</span>
                </Link>
                <nav className="hidden md:flex space-x-8">
                  <Link className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="/">
                    Home
                  </Link>
                  <Link className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="/properties">
                    Properties
                  </Link>
                  <Link className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="/blog/1">
                    Blog
                  </Link>
                  <Link className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="/contact">
                    Contact
                  </Link>
                </nav>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                    <Search className="h-5 w-5" />
                  </button>
                  <Link href="/contact" className="hidden md:flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors">
                    <Phone className="h-5 w-5" />
                    <span className="text-sm font-medium">Call Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-100 py-8 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm text-gray-600">© 2024 Main Line Realty. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

