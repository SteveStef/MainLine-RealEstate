import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

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

