
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Newspaper, User, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              Real Estate
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/properties" icon={<Home size={18} />}>Properties</NavLink>
            <NavLink href="/blog" icon={<Newspaper size={18} />}>Blog</NavLink>
            <NavLink href="/about" icon={<User size={18} />}>About Me</NavLink>
            <NavLink href="/call-agent" icon={<Phone size={18} />}>Call an Agent</NavLink>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 bg-white/90 backdrop-blur-md">
            <MobileNavLink href="/properties" onClick={toggleMenu} icon={<Home size={18} />}>Properties</MobileNavLink>
            <MobileNavLink href="/blog" onClick={toggleMenu} icon={<Newspaper size={18} />}>Blog</MobileNavLink>
            <MobileNavLink href="/about" onClick={toggleMenu} icon={<User size={18} />}>About Me</MobileNavLink>
            <MobileNavLink href="/call-agent" onClick={toggleMenu} icon={<Phone size={18} />}>Call an Agent</MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

const NavLink = ({ href, icon, children }) => (
  <Link href={href} className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors">
    <span className="mr-2">{icon}</span>
    {children}
  </Link>
)

const MobileNavLink = ({ href, onClick, icon, children }) => (
  <Link href={href} className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors" onClick={onClick}>
    <span className="mr-2">{icon}</span>
    {children}
  </Link>
)

export default Header

