import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ['latin'], variable: '--font-merriweather' })

export const metadata = {
  title: 'Main Line Realty',
  description: 'Luxury real estate in the Main Line area',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-800 font-serif">Main Line Realty</span>
                </Link>
                <nav className="hidden md:flex space-x-8">
                  <Link href="/properties" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Properties</Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">About Me</Link>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Blog</Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Contact</Link>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                  <a href="tel:+12345678900" className="flex items-center text-gray-600 hover:text-gray-900">
                    <Phone size={18} className="mr-2" />
                    <span>(234) 567-8900</span>
                  </a>
                  <a href="mailto:info@mainlinerealty.com" className="flex items-center text-gray-600 hover:text-gray-900">
                    <Mail size={18} className="mr-2" />
                    <span>info@mainlinerealty.com</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 py-2">
              <div className="container mx-auto px-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>216 E Lancaster Ave, Wayne, PA 19087</span>
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

