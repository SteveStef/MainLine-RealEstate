'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Crown } from 'lucide-react'

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }

        setLastScrollY(window.scrollY)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
<header
  className={`fixed w-full bg-white text-black py-4 border-b border-gray-300 transition-transform duration-300 z-50 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`}
>
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Crown className="h-8 w-8 text-black" />
        <span className="text-2xl font-bold text-black">Main Line Estate</span>
      </Link>
      <nav className="hidden md:flex space-x-8">
        <Link href="/properties" className="text-black hover:text-gray-500 transition duration-300 font-medium">
          Properties
        </Link>
        <Link href="/about" className="text-black hover:text-gray-500 transition duration-300 font-medium">
          About
        </Link>
        <Link href="/media" className="text-black hover:text-gray-500 transition duration-300 font-medium">
          Media
        </Link>
      </nav>
      <Link
        href="/book-viewing"
        className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
      >
        Book a Viewing
      </Link>
    </div>
  </div>
</header>
  )
}

