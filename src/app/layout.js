import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ['latin'], variable: '--font-merriweather' })

export const metadata = {
  title: 'Main Line Realty',
  description: 'Luxury real estate in the Main Line area',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-SansSerif">
       <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
 <footer className="bg-gray-100 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-4">Main Line Realty</h3>
            <p className="text-gray-600 mb-4">Specializing in luxury properties throughout the Main Line area.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-600 hover:text-gray-900">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas We Serve */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-4">Areas We Serve</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/places/Bryn%20Mawr" className="text-gray-600 hover:text-gray-900">
                  Bryn Mawr
                </Link>
              </li>
              <li>
                <Link href="/places/gladwyne" className="text-gray-600 hover:text-gray-900">
                  Gladwyne
                </Link>
              </li>
              <li>
                <Link href="/places/villanova" className="text-gray-600 hover:text-gray-900">
                  Villanova
                </Link>
              </li>
              <li>
                <Link href="/places/wayne" className="text-gray-600 hover:text-gray-900">
                  Wayne
                </Link>
              </li>
              <li>
                <Link href="/places/haverford" className="text-gray-600 hover:text-gray-900">
                  Haverford
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-merriweather text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  216 E Lancaster Ave, 
                  <br />
                  Wayne, PA 19087
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-gray-600">(610) 947-0408</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-600" />
                <span className="text-gray-600">peterstefanatos@compass.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">Serving the Main Line area with distinction and integrity</p>
        </div>
      </div>
    </footer>
        </div>
      </body>
    </html>
  )
}

